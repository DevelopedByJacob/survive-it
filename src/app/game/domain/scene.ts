import type { Choice } from './choice';
import type { Requirements } from './requirements';

export type SceneType = 'opening' | 'regular' | 'closing';

export interface Scene {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
  type: SceneType;
  priority?: number;
  repeatable?: boolean;
  requirements?: Requirements;
}

export type SceneRequirements = Requirements;
