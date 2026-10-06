import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { GameService } from '../../data-access/game.service';

export const activeGameGuard: CanActivateFn = () => {
  const game = inject(GameService);
  const router = inject(Router);

  return game.state() ? true : router.createUrlTree(['/nueva-partida']);
};
