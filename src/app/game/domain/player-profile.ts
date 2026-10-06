import type { CareerState } from './career';
import type { StatEffects } from './choice';

export type PlayerBackground = 'no-degree' | 'university' | 'bootcamp';
export type AvatarId = 'avatar-1' | 'avatar-2' | 'avatar-3' | 'avatar-4' | 'avatar-5' | 'avatar-6';

export interface PlayerProfile {
  name: string;
  age: number;
  background: PlayerBackground;
  avatarId: AvatarId;
}

export interface NewGameConfiguration {
  name: string;
  background: PlayerBackground;
  avatarId: AvatarId;
  career: CareerState;
}

export const BACKGROUND_STAT_EFFECTS: Record<PlayerBackground, StatEffects> = {
  'no-degree': {
    experience: -10,
    stress: -10,
    reputation: -5,
  },
  university: {
    experience: 10,
    stress: 5,
    reputation: 5,
  },
  bootcamp: {
    experience: 5,
    stress: 10,
    reputation: 10,
  },
};
