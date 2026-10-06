import { AvatarId } from '../../domain/player-profile';

export type AvatarOption = {
  id: AvatarId;
  label: string;
  src: string;
};

// Edad a partir de la cual se muestra la versión senior del avatar (/avatars/<id>-60.webp).
export const SENIOR_AVATAR_AGE = 60;

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'avatar-1', label: 'Avatar 1', src: '/avatars/avatar-1.webp' },
  { id: 'avatar-2', label: 'Avatar 2', src: '/avatars/avatar-2.webp' },
  { id: 'avatar-3', label: 'Avatar 3', src: '/avatars/avatar-3.webp' },
  { id: 'avatar-4', label: 'Avatar 4', src: '/avatars/avatar-4.webp' },
  { id: 'avatar-5', label: 'Avatar 5', src: '/avatars/avatar-5.webp' },
  { id: 'avatar-6', label: 'Avatar 6', src: '/avatars/avatar-6.webp' },
];

export function getAvatarSource(avatarId: AvatarId, age?: number): string {
  return age !== undefined && age >= SENIOR_AVATAR_AGE
    ? `/avatars/${avatarId}-${SENIOR_AVATAR_AGE}.webp`
    : `/avatars/${avatarId}.webp`;
}
