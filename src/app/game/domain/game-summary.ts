import type { CareerState } from './career';
import type { SalaryChange } from './game-state';
import type { PlayerProfile } from './player-profile';

export interface GameSummary {
  id: string;
  finishedAt: string;
  player: PlayerProfile;
  career: CareerState;
  finalSceneId: string;
  finalOutcome: string;
  year: number;
  stats: {
    salary: number;
    experience: number;
    reputation: number;
    stress: number;
  };
  lifetimeEarnings: number;
  contributionYears: number;
  salaryChangeCount: number;
  companies: string[];
  achievements: string[];
  salaryHistory: SalaryChange[];
}

export interface PlayerArchive {
  version: 1;
  unlockedAchievementIds: string[];
  // Se guarda aparte del historial porque este solo conserva las últimas partidas.
  discoveredEndingIds: string[];
  games: GameSummary[];
}
