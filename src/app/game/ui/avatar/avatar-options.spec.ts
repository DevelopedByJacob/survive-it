import { AVATAR_OPTIONS, getAvatarSource } from './avatar-options';

describe('getAvatarSource', () => {
  it('uses the young image when no age is given or before turning 60', () => {
    expect(getAvatarSource('avatar-1')).toBe('/avatars/avatar-1.webp');
    expect(getAvatarSource('avatar-1', 59)).toBe('/avatars/avatar-1.webp');
  });

  it('uses the senior image from 60 onwards', () => {
    expect(getAvatarSource('avatar-1', 60)).toBe('/avatars/avatar-1-60.webp');
    expect(getAvatarSource('avatar-6', 65)).toBe('/avatars/avatar-6-60.webp');
  });

  it('matches the image shown when choosing an avatar', () => {
    AVATAR_OPTIONS.forEach(({ id, src }) => expect(getAvatarSource(id, 25)).toBe(src));
  });
});
