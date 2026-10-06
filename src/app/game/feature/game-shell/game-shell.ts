import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { GameService } from '../../data-access/game.service';
import { GameArchiveService } from '../../data-access/game-archive.service';

@Component({
  selector: 'app-game-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './game-shell.html',
  styleUrl: './game-shell.scss',
})
export class GameShell {
  protected readonly game = inject(GameService);
  protected readonly archive = inject(GameArchiveService);
}
