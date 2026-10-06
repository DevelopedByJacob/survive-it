import type { Requirements } from './requirements';
import type { CareerState } from './career';

export interface Choice {
  id: string;
  text: string;
  outcome: ChoiceOutcome;
  requirements?: Requirements;
  highlight?: boolean;
  setCareer?: CareerState;

  effects?: StatEffects;

  addFlags?: string[];
  removeFlags?: string[];

  endsGame?: boolean;
  nextSceneId?: string;
  companyName?: string;
}

export interface StatEffects {
  // El salario es una cifra anual absoluta, por ejemplo 30000.
  salary?: number;
  // Aumento o reducción sobre el salario anual actual.
  salaryIncrease?: number;
  experience?: number;
  reputation?: number;
  stress?: number;
}

export interface ChoiceOutcome {
  text: string;
}
