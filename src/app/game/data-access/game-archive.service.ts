import { computed, Injectable, signal } from '@angular/core';

import { GameState } from '../domain/game-state';
import { GameSummary, PlayerArchive } from '../domain/game-summary';

const ARCHIVE_STORAGE_KEY = 'survive-it.archive';
const MAX_SAVED_GAMES = 50;
const EMPTY_ARCHIVE: PlayerArchive = {
  version: 1,
  unlockedAchievementIds: [],
  discoveredEndingIds: [],
  games: [],
};

@Injectable({ providedIn: 'root' })
export class GameArchiveService {
  private readonly archiveSignal = signal<PlayerArchive>(this.readArchive());

  readonly archive = this.archiveSignal.asReadonly();
  readonly games = computed(() => this.archiveSignal().games);
  readonly hasGames = computed(() => this.archiveSignal().games.length > 0);
  readonly unlockedAchievementIds = computed(() => this.archiveSignal().unlockedAchievementIds);
  readonly discoveredEndingIds = computed(() => this.archiveSignal().discoveredEndingIds);

  recordFinishedGame(state: GameState): void {
    const summary = this.createSummary(state);
    const currentArchive = this.archiveSignal();
    const nextArchive: PlayerArchive = {
      version: 1,
      unlockedAchievementIds: [
        ...new Set([...currentArchive.unlockedAchievementIds, ...summary.achievements]),
      ],
      discoveredEndingIds: [
        ...new Set([...currentArchive.discoveredEndingIds, summary.finalSceneId]),
      ],
      games: [summary, ...currentArchive.games].slice(0, MAX_SAVED_GAMES),
    };

    this.archiveSignal.set(nextArchive);
    this.saveArchive(nextArchive);
  }

  private createSummary(state: GameState): GameSummary {
    return {
      id: this.createId(),
      finishedAt: new Date().toISOString(),
      player: { ...state.player },
      career: { ...state.career },
      finalSceneId: state.currentSceneId,
      finalOutcome: state.finalOutcome ?? 'Tu aventura ha llegado a su fin.',
      year: state.year,
      stats: { ...state.stats },
      lifetimeEarnings: state.lifetimeEarnings,
      contributionYears: state.contributionYears,
      salaryChangeCount: state.salaryChangeCount,
      companies: [
        ...new Set(
          state.salaryHistory.flatMap((change) => (change.companyName ? [change.companyName] : [])),
        ),
      ],
      achievements: [...state.achievements],
      salaryHistory: state.salaryHistory.map((change) => ({ ...change })),
    };
  }

  private readArchive(): PlayerArchive {
    try {
      const value = localStorage.getItem(ARCHIVE_STORAGE_KEY);
      if (!value) {
        return EMPTY_ARCHIVE;
      }

      const parsed = JSON.parse(value) as Partial<PlayerArchive>;
      if (
        parsed.version !== 1 ||
        !Array.isArray(parsed.games) ||
        !Array.isArray(parsed.unlockedAchievementIds)
      ) {
        return EMPTY_ARCHIVE;
      }

      const games = parsed.games as GameSummary[];

      return {
        version: 1,
        games,
        unlockedAchievementIds: parsed.unlockedAchievementIds,
        // Los archivos anteriores al catálogo de finales lo reconstruyen desde su historial.
        discoveredEndingIds: Array.isArray(parsed.discoveredEndingIds)
          ? parsed.discoveredEndingIds
          : [...new Set(games.map((game) => game.finalSceneId))],
      };
    } catch {
      return EMPTY_ARCHIVE;
    }
  }

  private saveArchive(archive: PlayerArchive): void {
    try {
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(archive));
    } catch {
      // El juego continúa aunque el navegador bloquee el almacenamiento.
    }
  }

  private createId(): string {
    return (
      globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
    );
  }
}
