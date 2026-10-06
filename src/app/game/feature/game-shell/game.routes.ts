import { Routes } from '@angular/router';

import { activeGameGuard } from './active-game.guard';
import { finishedGameGuard } from './finished-game.guard';
import { playingGameGuard } from './playing-game.guard';

export const GAME_ROUTES: Routes = [
  {
    path: '',
    canActivate: [activeGameGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [playingGameGuard],
        loadComponent: () => import('../game-page/game-page').then((module) => module.GamePage),
      },
      {
        path: 'final',
        canActivate: [finishedGameGuard],
        loadComponent: () =>
          import('../end-game-page/end-game-page').then((module) => module.EndGamePage),
      },
    ],
  },
];
