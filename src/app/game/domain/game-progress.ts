import type { Choice, StatEffects } from './choice';
import type { GameState } from './game-state';

export const BASE_STATS: GameState['stats'] = {
  salary: 0,
  experience: 50,
  reputation: 50,
  stress: 40,
};

// El arranque profesional son las 3 primeras decisiones de toda partida (25 -> 27 -> 29 -> 30),
// independientemente de qué escenas concretas le toquen al jugador. A partir de ahí, cada
// decisión representa un capítulo de cinco años.
const EARLY_CAREER_YEAR_STEPS = [2, 2, 1];
const REGULAR_YEAR_STEP = 5;

export function calculateYearsToAdvance(decisionsMade: number): number {
  return EARLY_CAREER_YEAR_STEPS[decisionsMade] ?? REGULAR_YEAR_STEP;
}

export function applyStatEffects(
  stats: GameState['stats'],
  effects: StatEffects | undefined,
): GameState['stats'] {
  return {
    salary: effects?.salary ?? stats.salary + (effects?.salaryIncrease ?? 0),
    experience: clampStat(stats.experience + (effects?.experience ?? 0)),
    reputation: clampStat(stats.reputation + (effects?.reputation ?? 0)),
    stress: clampStat(stats.stress + (effects?.stress ?? 0)),
  };
}

function clampStat(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function applyFlags(flags: string[], choice: Choice): string[] {
  const nextFlags = new Set(flags);

  choice.addFlags?.forEach((flag) => nextFlags.add(flag));
  choice.removeFlags?.forEach((flag) => nextFlags.delete(flag));

  return [...nextFlags];
}
