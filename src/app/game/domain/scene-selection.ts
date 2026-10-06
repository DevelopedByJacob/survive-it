import { meetsRequirements } from './requirements';
import type { GameState } from './game-state';
import type { Scene, SceneType } from './scene';

export function findScene(scenes: Scene[], sceneId: string): Scene | null {
  return scenes.find(({ id }) => id === sceneId) ?? null;
}

export function findSceneFromPool(scenes: Scene[], game: GameState, type: SceneType): Scene | null {
  const candidates = scenes.filter(
    (scene) =>
      scene.type === type &&
      meetsRequirements(scene.requirements, game) &&
      (scene.repeatable || !game.visitedSceneIds.includes(scene.id)),
  );

  if (!candidates.length) {
    return null;
  }

  const highestPriority = Math.max(...candidates.map((scene) => scene.priority ?? 0));
  const prioritizedCandidates = candidates.filter(
    (scene) => (scene.priority ?? 0) === highestPriority,
  );

  return prioritizedCandidates[Math.floor(Math.random() * prioritizedCandidates.length)];
}
