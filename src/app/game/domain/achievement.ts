import type { GameState } from './game-state';

export type AchievementRarity = 'silver' | 'gold';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: AchievementRarity;
  isUnlocked: (state: GameState) => boolean;
}

export function getUnlockedAchievementIds(achievements: Achievement[], game: GameState): string[] {
  return achievements.filter((achievement) => achievement.isUnlocked(game)).map(({ id }) => id);
}
