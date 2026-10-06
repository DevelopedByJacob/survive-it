import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { GameArchiveService } from '../../data-access/game-archive.service';
import { GameService } from '../../data-access/game.service';
import { NewGameConfiguration } from '../../domain/player-profile';
import { PreGameSetup } from '../../ui/pre-game-setup/pre-game-setup';

@Component({
  selector: 'app-new-game-page',
  imports: [PreGameSetup, RouterLink],
  templateUrl: './new-game-page.html',
  styleUrl: './new-game-page.scss',
})
export class NewGamePage {
  protected readonly game = inject(GameService);
  protected readonly archive = inject(GameArchiveService);
  private readonly router = inject(Router);

  protected readonly continueLink = computed(() =>
    this.game.isFinished() ? '/juego/final' : '/juego',
  );

  startGame(configuration: NewGameConfiguration): void {
    this.game.startGame(configuration);
    void this.router.navigate(['/juego']);
  }
}
