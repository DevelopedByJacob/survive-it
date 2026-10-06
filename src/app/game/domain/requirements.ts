import type { CareerState } from './career';
import type { GameState } from './game-state';
import type { PlayerBackground } from './player-profile';

export interface Requirements {
  age?: number;
  minAge?: number;
  maxAge?: number;
  salary?: number;
  minSalary?: number;
  maxSalary?: number;
  hasEverHadSalary?: boolean;
  minSalaryChangeCount?: number;
  maxSalaryChangeCount?: number;
  minLifetimeEarnings?: number;
  maxLifetimeEarnings?: number;
  minContributionYears?: number;
  minExperience?: number;
  minReputation?: number;
  maxReputation?: number;
  minStress?: number;
  maxStress?: number;
  career?: CareerState;
  excludedCareers?: CareerState[];
  requiredFlags?: string[];
  excludedFlags?: string[];
  background?: PlayerBackground[];
}

type RequirementCheck = (requirements: Requirements, game: GameState) => boolean;

// Cada entrada solo se aplica cuando el requisito correspondiente está presente; en caso
// contrario se considera superado. Mantenerlas como funciones con nombre facilita saber, al
// depurar por qué una escena no aparece, cuál de los requisitos es el que falla.
const REQUIREMENT_CHECKS: Record<string, RequirementCheck> = {
  minExperience: (r, game) =>
    r.minExperience === undefined || game.stats.experience >= r.minExperience,
  minReputation: (r, game) =>
    r.minReputation === undefined || game.stats.reputation >= r.minReputation,
  maxReputation: (r, game) =>
    r.maxReputation === undefined || game.stats.reputation <= r.maxReputation,
  minStress: (r, game) => r.minStress === undefined || game.stats.stress >= r.minStress,
  maxStress: (r, game) => r.maxStress === undefined || game.stats.stress <= r.maxStress,
  age: (r, game) => r.age === undefined || game.player.age === r.age,
  minAge: (r, game) => r.minAge === undefined || game.player.age >= r.minAge,
  maxAge: (r, game) => r.maxAge === undefined || game.player.age <= r.maxAge,
  salary: (r, game) => r.salary === undefined || game.stats.salary === r.salary,
  minSalary: (r, game) => r.minSalary === undefined || game.stats.salary >= r.minSalary,
  maxSalary: (r, game) => r.maxSalary === undefined || game.stats.salary <= r.maxSalary,
  hasEverHadSalary: (r, game) =>
    r.hasEverHadSalary === undefined || game.hasEverHadSalary === r.hasEverHadSalary,
  minSalaryChangeCount: (r, game) =>
    r.minSalaryChangeCount === undefined || game.salaryChangeCount >= r.minSalaryChangeCount,
  maxSalaryChangeCount: (r, game) =>
    r.maxSalaryChangeCount === undefined || game.salaryChangeCount <= r.maxSalaryChangeCount,
  minLifetimeEarnings: (r, game) =>
    r.minLifetimeEarnings === undefined || game.lifetimeEarnings >= r.minLifetimeEarnings,
  maxLifetimeEarnings: (r, game) =>
    r.maxLifetimeEarnings === undefined || game.lifetimeEarnings <= r.maxLifetimeEarnings,
  minContributionYears: (r, game) =>
    r.minContributionYears === undefined || game.contributionYears >= r.minContributionYears,
  background: (r, game) => !r.background || r.background.includes(game.player.background),
  requiredFlags: (r, game) =>
    !r.requiredFlags || r.requiredFlags.every((flag) => game.flags.includes(flag)),
  excludedFlags: (r, game) =>
    !r.excludedFlags || !r.excludedFlags.some((flag) => game.flags.includes(flag)),
  career: (r, game) => !r.career || matchesCareer(r.career, game.career),
  excludedCareers: (r, game) =>
    !r.excludedCareers || !r.excludedCareers.some((career) => matchesCareer(career, game.career)),
};

function matchesCareer(requirement: CareerState, career: CareerState): boolean {
  return (
    requirement.area === career.area &&
    (!requirement.specialization || requirement.specialization === career.specialization)
  );
}

export function meetsRequirements(
  requirements: Requirements | undefined,
  game: GameState,
): boolean {
  if (!requirements) {
    return true;
  }

  return Object.values(REQUIREMENT_CHECKS).every((check) => check(requirements, game));
}
