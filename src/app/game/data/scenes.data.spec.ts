import type { GameState } from '../domain/game-state';
import { ACHIEVEMENTS } from './achievements.data';
import { ENDINGS_CATALOG } from './endings-catalog.data';
import { SCENES } from './scenes.data';

describe('SCENES integrity', () => {
  const sceneIds = new Set(SCENES.map((scene) => scene.id));

  it('has no duplicate scene ids', () => {
    const duplicates = SCENES.map((scene) => scene.id).filter(
      (id, index, ids) => ids.indexOf(id) !== index,
    );

    expect(duplicates).toEqual([]);
  });

  it('only references choice.nextSceneId ids that exist', () => {
    const brokenReferences = SCENES.flatMap((scene) =>
      scene.choices
        .filter((choice) => choice.nextSceneId && !sceneIds.has(choice.nextSceneId))
        .map((choice) => `${scene.id} -> ${choice.id} -> ${choice.nextSceneId}`),
    );

    expect(brokenReferences).toEqual([]);
  });

  it('has no duplicate choice ids within the same scene', () => {
    const scenesWithDuplicateChoices = SCENES.filter((scene) => {
      const choiceIds = scene.choices.map((choice) => choice.id);

      return new Set(choiceIds).size !== choiceIds.length;
    }).map((scene) => scene.id);

    expect(scenesWithDuplicateChoices).toEqual([]);
  });

  it('gives every scene at least one choice', () => {
    const emptyScenes = SCENES.filter((scene) => scene.choices.length === 0).map(
      (scene) => scene.id,
    );

    expect(emptyScenes).toEqual([]);
  });
});

describe('ENDINGS_CATALOG integrity', () => {
  it('lists exactly the scenes that can end a game', () => {
    const endingSceneIds = SCENES.filter(
      (scene) => scene.type === 'closing' || scene.choices.some((choice) => choice.endsGame),
    )
      .map((scene) => scene.id)
      .sort();

    expect(ENDINGS_CATALOG.map((entry) => entry.sceneId).sort()).toEqual(endingSceneIds);
  });
});

describe('ACHIEVEMENTS integrity', () => {
  it('has no duplicate achievement ids', () => {
    const ids = ACHIEVEMENTS.map((achievement) => achievement.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('unlocks one ending achievement per ending scene', () => {
    const unlockedAt = (sceneId: string) =>
      ACHIEVEMENTS.filter((achievement) =>
        achievement.isUnlocked({
          currentSceneId: sceneId,
          flags: [],
          salaryHistory: [],
          lifetimeEarnings: 0,
          hasEverHadSalary: false,
        } as unknown as GameState),
      ).map(({ id }) => id);

    expect(unlockedAt('amor-incontrolable')).toEqual(['amor-incondicional']);
    expect(unlockedAt('retiro-al-campo')).toEqual(['retiro-campestre']);
    expect(unlockedAt('superviviente-cansado')).toEqual(['estresado']);
  });
});
