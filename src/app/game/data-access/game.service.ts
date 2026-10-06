import { computed, inject, Injectable, signal } from '@angular/core';

import { SCENES } from '../data/scenes.data';
import { ACHIEVEMENTS } from '../data/achievements.data';
import { GameArchiveService } from './game-archive.service';
import { GameStorageService } from './game-storage.service';
import { getUnlockedAchievementIds } from '../domain/achievement';
import { GameState } from '../domain/game-state';
import {
  applyFlags,
  applyStatEffects,
  BASE_STATS,
  calculateYearsToAdvance,
} from '../domain/game-progress';
import { BACKGROUND_STAT_EFFECTS, NewGameConfiguration } from '../domain/player-profile';
import { meetsRequirements } from '../domain/requirements';
import { Scene } from '../domain/scene';
import { findScene, findSceneFromPool } from '../domain/scene-selection';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly archive = inject(GameArchiveService);
  private readonly storage = inject(GameStorageService);

  private readonly stateSignal = signal<GameState | null>(this.storage.readActiveGame());
  private readonly savedPlayerNameSignal = signal(this.storage.readPlayerName());

  readonly state = this.stateSignal.asReadonly();
  readonly savedPlayerName = this.savedPlayerNameSignal.asReadonly();

  readonly currentScene = computed(() => {
    const game = this.stateSignal();

    return game ? findScene(SCENES, game.currentSceneId) : null;
  });

  readonly isFinished = computed(() => this.stateSignal()?.status === 'finished');

  readonly availableChoices = computed(() => {
    const game = this.stateSignal();
    const scene = game ? findScene(SCENES, game.currentSceneId) : null;

    return game && scene
      ? scene.choices.filter((choice) => meetsRequirements(choice.requirements, game))
      : [];
  });

  startGame(configuration: NewGameConfiguration): void {
    const name = configuration.name.trim();

    if (!name) {
      throw new Error('El nombre del jugador es obligatorio.');
    }

    this.savedPlayerNameSignal.set(name);
    this.storage.savePlayerName(name);

    const initialState: GameState = {
      year: 2026,
      currentSceneId: 'inicio',
      status: 'playing',
      stats: applyStatEffects(BASE_STATS, BACKGROUND_STAT_EFFECTS[configuration.background]),
      player: {
        name,
        age: 25,
        background: configuration.background,
        avatarId: configuration.avatarId,
      },
      career: configuration.career,
      initialCareer: configuration.career,
      flags: [],
      achievements: [],
      pendingOutcome: null,
      visitedSceneIds: [],
      hasEverHadSalary: false,
      salaryChangeCount: 0,
      lifetimeEarnings: 0,
      contributionYears: 0,
      salaryHistory: [],
      finalOutcome: null,
      history: [],
    };

    const openingScene = findSceneFromPool(SCENES, initialState, 'opening');

    if (!openingScene) {
      throw new Error('No hay ninguna escena inicial compatible con esta partida.');
    }

    initialState.currentSceneId = openingScene.id;
    initialState.visitedSceneIds = [openingScene.id];
    this.stateSignal.set(initialState);
    this.storage.persistActiveGame(initialState);
  }

  choose(choiceId: string): void {
    const game = this.requireActiveGame();

    if (game.status === 'finished') {
      throw new Error('No puedes elegir una opción en una partida terminada.');
    }
    if (game.pendingOutcome) {
      throw new Error('Debes continuar después de ver el resultado de la decisión.');
    }

    const scene = this.requireScene(game.currentSceneId);
    const choice = scene.choices.find(({ id }) => id === choiceId);

    if (!choice || !meetsRequirements(choice.requirements, game)) {
      throw new Error('La opción no pertenece a la escena actual.');
    }

    const nextStats = applyStatEffects(game.stats, choice.effects);
    const salaryChanged = nextStats.salary !== game.stats.salary;
    const hasEverHadSalary = game.hasEverHadSalary || nextStats.salary > 0;
    const salaryChangeCount =
      salaryChanged && game.hasEverHadSalary ? game.salaryChangeCount + 1 : game.salaryChangeCount;

    const nextState: GameState = {
      ...game,
      stats: nextStats,
      flags: applyFlags(game.flags, choice),
      career: choice.setCareer ?? game.career,
      hasEverHadSalary,
      salaryChangeCount,
      salaryHistory: salaryChanged
        ? [
            ...game.salaryHistory,
            {
              year: game.year,
              previousSalary: game.stats.salary,
              salary: nextStats.salary,
              companyName: choice.companyName,
            },
          ]
        : game.salaryHistory,
      pendingOutcome: {
        text: choice.outcome.text,
        effects: choice.effects ?? {},
        yearsToAdvance: calculateYearsToAdvance(game.history.length),
        endsGame: choice.endsGame,
        nextSceneId: choice.nextSceneId,
      },
      history: [...game.history, choice.id],
    };

    this.stateSignal.set(nextState);
    this.storage.persistActiveGame(nextState);
  }

  continueAfterOutcome(): void {
    const game = this.requireActiveGame();
    const outcome = game.pendingOutcome;

    if (!outcome) {
      throw new Error('No hay ningún resultado pendiente.');
    }

    const currentScene = this.requireScene(game.currentSceneId);

    if (currentScene.type === 'closing' || outcome.endsGame) {
      const finishedState: GameState = {
        ...game,
        status: 'finished',
        pendingOutcome: null,
        finalOutcome: outcome.text,
        achievements: getUnlockedAchievementIds(ACHIEVEMENTS, game),
      };
      this.stateSignal.set(finishedState);
      this.storage.persistActiveGame(finishedState);
      this.archive.recordFinishedGame(finishedState);
      return;
    }

    const advancedState: GameState = {
      ...game,
      year: game.year + outcome.yearsToAdvance,
      player: { ...game.player, age: game.player.age + outcome.yearsToAdvance },
      lifetimeEarnings: game.lifetimeEarnings + game.stats.salary * outcome.yearsToAdvance,
      contributionYears:
        game.contributionYears + (game.stats.salary > 0 ? outcome.yearsToAdvance : 0),
      pendingOutcome: null,
    };

    // Una escena encadenada explícitamente (p. ej. un final directo) tiene preferencia sobre el
    // cierre por edad: si no, elegirla a los 60 años la perdería al saltar a los 65.
    const nextScene = outcome.nextSceneId
      ? this.requireScene(outcome.nextSceneId)
      : advancedState.player.age >= 65
        ? findSceneFromPool(SCENES, advancedState, 'closing')
        : (findSceneFromPool(SCENES, advancedState, 'regular') ??
          findSceneFromPool(SCENES, advancedState, 'closing'));

    const nextState: GameState = {
      ...advancedState,
      currentSceneId: nextScene?.id ?? game.currentSceneId,
      status: nextScene ? 'playing' : 'finished',
      achievements: nextScene
        ? advancedState.achievements
        : getUnlockedAchievementIds(ACHIEVEMENTS, advancedState),
      visitedSceneIds: nextScene
        ? [...advancedState.visitedSceneIds, nextScene.id]
        : advancedState.visitedSceneIds,
    };
    this.stateSignal.set(nextState);
    this.storage.persistActiveGame(nextState);

    if (!nextScene) {
      this.archive.recordFinishedGame(nextState);
    }
  }

  restart(): void {
    const { career, initialCareer, player } = this.requireActiveGame();

    this.startGame({
      name: player.name,
      background: player.background,
      avatarId: player.avatarId,
      career: initialCareer ?? { area: career.area },
    });
  }

  private requireActiveGame(): GameState {
    const game = this.stateSignal();

    if (!game) {
      throw new Error('No hay una partida activa.');
    }

    return game;
  }

  private requireScene(sceneId: string): Scene {
    const scene = findScene(SCENES, sceneId);

    if (!scene) {
      throw new Error(`No existe la escena con id "${sceneId}".`);
    }

    return scene;
  }
}
