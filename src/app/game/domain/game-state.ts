import { CareerState } from './career';
import { StatEffects } from './choice';
import { PlayerProfile } from './player-profile';

export interface GameState {
  year: number;

  stats: {
    salary: number;
    experience: number;
    reputation: number;
    stress: number;
  };
  player: PlayerProfile;
  career: CareerState;
  // Carrera elegida al empezar, antes de especializaciones o cambios de área. Opcional para no
  // invalidar partidas guardadas antes de que existiera; en ese caso se usa el área actual.
  initialCareer?: CareerState;
  flags: string[]; // Puede ser util para condicionar futuras escenas
  achievements: string[]; // trofeos o logros
  currentSceneId: string;
  status: 'playing' | 'finished' | 'notStarted';
  pendingOutcome: PendingOutcome | null;
  visitedSceneIds: string[];
  hasEverHadSalary: boolean;
  salaryChangeCount: number;
  lifetimeEarnings: number;
  contributionYears: number;
  salaryHistory: SalaryChange[];
  finalOutcome: string | null;
  history: string[];
}

export interface SalaryChange {
  year: number;
  previousSalary: number;
  salary: number;
  companyName?: string;
}

export interface PendingOutcome {
  text: string;
  effects: StatEffects;
  yearsToAdvance: number;
  endsGame?: boolean;
  nextSceneId?: string;
}
