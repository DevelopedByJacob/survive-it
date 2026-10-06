import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { GameService } from '../../data-access/game.service';

// Una partida terminada ya no tiene decisiones pendientes: se envía al resumen final en vez de
// mostrar la última escena sin botones.
export const playingGameGuard: CanActivateFn = () => {
  const game = inject(GameService);
  const router = inject(Router);

  return game.isFinished() ? router.createUrlTree(['/juego/final']) : true;
};
