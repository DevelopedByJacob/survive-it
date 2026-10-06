import { Pipe, PipeTransform } from '@angular/core';

import { AvatarId } from '../../domain/player-profile';
import { getAvatarSource } from './avatar-options';

// Ruta de la imagen del avatar para una edad concreta: `avatarId | avatarSrc: age`.
@Pipe({ name: 'avatarSrc' })
export class AvatarSrcPipe implements PipeTransform {
  transform(avatarId: AvatarId, age?: number): string {
    return getAvatarSource(avatarId, age);
  }
}
