import { Component, inject } from '@angular/core';

import { GameService } from '../../data-access/game.service';
import { PlayerSheet } from '../../ui/player-sheet/player-sheet';

@Component({
  selector: 'app-player-sheet-page',
  imports: [PlayerSheet],
  templateUrl: './player-sheet-page.html',
  styleUrl: './player-sheet-page.scss',
})
export class PlayerSheetPage {
  protected readonly game = inject(GameService);
}
