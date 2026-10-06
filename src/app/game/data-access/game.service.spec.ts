import { TestBed } from '@angular/core/testing';

import { CareerState } from '../domain/career';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  const configuration = {
    name: 'Alex',
    background: 'bootcamp' as const,
    avatarId: 'avatar-1' as const,
    career: {
      area: 'development',
      specialization: 'frontend',
    } satisfies CareerState,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts a bootcamp game at its dedicated opening scene', () => {
    service.startGame(configuration);

    expect(service.state()).toMatchObject({
      currentSceneId: 'el-demo-day',
      status: 'playing',
      career: configuration.career,
      player: { name: 'Alex', age: 25, background: 'bootcamp', avatarId: 'avatar-1' },
    });
    expect(service.currentScene()?.id).toBe('el-demo-day');
  });

  it('starts with an eligible opening scene', () => {
    service.startGame({
      ...configuration,
      background: 'university',
    });

    expect(service.currentScene()?.id).toBe('fiesta-o-siesta');
  });

  it('starts with the recruiter call for a player without a degree', () => {
    service.startGame({
      ...configuration,
      background: 'no-degree',
    });

    expect(service.currentScene()?.id).toBe('la-llamada');
  });

  it('applies background effects to the base statistics', () => {
    service.startGame(configuration);

    expect(service.state()?.stats).toEqual({
      salary: 0,
      experience: 55,
      reputation: 60,
      stress: 50,
    });
  });

  it('prioritizes the early ending at age 30 without prior employment', () => {
    service.startGame(configuration);

    for (let index = 0; index < 3; index += 1) {
      const choiceId = service
        .availableChoices()
        .find(
          (choice) =>
            choice.effects?.salary === undefined && choice.effects?.salaryIncrease === undefined,
        )?.id;

      expect(choiceId).toBeTruthy();
      service.choose(choiceId!);
      service.continueAfterOutcome();
    }

    expect(service.state()?.player.age).toBe(30);
    expect(service.currentScene()?.id).toBe('amor-incontrolable');

    service.choose('aprender-bridge');
    service.continueAfterOutcome();

    expect(service.state()?.status).toBe('finished');
  });

  it('assigns a specialization through its career scene', () => {
    service.startGame({
      ...configuration,
      background: 'no-degree',
      career: { area: 'development' },
    });

    service.choose('exagerar-practicas');
    service.continueAfterOutcome();
    expect(service.currentScene()?.id).toBe('el-primer-camino');

    service.choose('especialidad-backend');

    expect(service.state()?.career).toEqual({ area: 'development', specialization: 'backend' });
  });

  it('shows the outcome before selecting the next eligible regular scene', () => {
    service.startGame(configuration);

    service.choose('demo-sin-tocar-nada');

    expect(service.state()?.currentSceneId).toBe('el-demo-day');
    expect(service.state()?.stats.stress).toBe(60);
    expect(service.state()?.pendingOutcome).toMatchObject({
      effects: { reputation: 5, stress: 10 },
    });

    service.continueAfterOutcome();

    expect(service.state()?.pendingOutcome).toBeNull();
    expect(service.currentScene()?.type).toBe('regular');
    expect(service.state()?.visitedSceneIds).toHaveLength(2);
    expect(service.state()?.year).toBe(2028);
    expect(service.state()?.player.age).toBe(27);
  });

  it('uses three early-career decisions before advancing in five-year chapters', () => {
    service.startGame({ ...configuration, background: 'no-degree' });

    service.choose('exagerar-practicas');
    service.continueAfterOutcome();
    expect(service.state()?.player.age).toBe(27);

    service.choose('especialidad-frontend');
    service.continueAfterOutcome();
    expect(service.state()?.player.age).toBe(29);

    const thirdChoice = service.currentScene()?.choices[0]?.id;
    expect(thirdChoice).toBeTruthy();
    service.choose(thirdChoice!);
    service.continueAfterOutcome();
    expect(service.state()?.player.age).toBe(30);

    const fourthChoice = service.currentScene()?.choices[0]?.id;
    expect(fourthChoice).toBeTruthy();
    service.choose(fourthChoice!);
    expect(service.state()?.pendingOutcome?.yearsToAdvance).toBe(5);
  });

  it('accumulates income and contribution years while a salary is active', () => {
    service.startGame({ ...configuration, background: 'no-degree' });

    service.choose('exagerar-practicas');
    service.continueAfterOutcome();

    expect(service.state()).toMatchObject({
      lifetimeEarnings: 42000,
      contributionYears: 2,
      salaryHistory: [{ year: 2026, previousSalary: 0, salary: 21000 }],
    });
  });

  it('restores an in-progress game for a freshly created service instance', () => {
    service.startGame(configuration);
    service.choose('demo-sin-tocar-nada');

    const restoredService = TestBed.runInInjectionContext(() => new GameService());

    expect(restoredService.state()).toMatchObject({
      currentSceneId: 'el-demo-day',
      pendingOutcome: { effects: { reputation: 5, stress: 10 } },
    });
  });

  it('does not restore a saved game that points to a scene that no longer exists', () => {
    service.startGame(configuration);
    localStorage.setItem(
      'survive-it.active-game',
      JSON.stringify({ ...service.state(), currentSceneId: 'escena-eliminada' }),
    );

    const restoredService = TestBed.runInInjectionContext(() => new GameService());

    expect(restoredService.state()).toBeNull();
  });

  it('restarts with the career chosen at the start, not the one reached during the game', () => {
    service.startGame({ ...configuration, career: { area: 'development' } });
    localStorage.setItem(
      'survive-it.active-game',
      JSON.stringify({ ...service.state(), career: { area: 'qa', specialization: 'manual' } }),
    );
    const restoredService = TestBed.runInInjectionContext(() => new GameService());

    restoredService.restart();

    expect(restoredService.state()?.career).toEqual({ area: 'development' });
  });

  it('keeps a chained ending chosen at 60 instead of jumping to the retirement closing', () => {
    service.startGame(configuration);
    localStorage.setItem(
      'survive-it.active-game',
      JSON.stringify({
        ...service.state(),
        currentSceneId: 'la-reunion-que-podia-ser-un-email',
        player: { ...service.state()!.player, age: 60 },
        stats: { ...service.state()!.stats, salary: 30000 },
        hasEverHadSalary: true,
        history: ['a', 'b', 'c', 'd'],
      }),
    );
    const restoredService = TestBed.runInInjectionContext(() => new GameService());

    restoredService.choose('meter-todo-en-cripto');
    restoredService.continueAfterOutcome();

    expect(restoredService.state()?.player.age).toBe(65);
    expect(restoredService.currentScene()?.id).toBe('pelotazo-cripto');
  });
});
