import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'nueva-partida',
    loadComponent: () =>
      import('./game/feature/new-game-page/new-game-page').then((module) => module.NewGamePage),
  },
  {
    path: 'juego',
    loadComponent: () =>
      import('./game/feature/game-shell/game-shell').then((module) => module.GameShell),
    loadChildren: () =>
      import('./game/feature/game-shell/game.routes').then((module) => module.GAME_ROUTES),
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./game/feature/game-history-page/game-history-page').then(
        (module) => module.GameHistoryPage,
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'nueva-partida' },
  { path: '**', redirectTo: 'nueva-partida' },
];
