import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../data-access/game.service';
import { StatEffects } from '../../domain/choice';
import { PlayerSheet } from '../../ui/player-sheet/player-sheet';

type OutcomeEffect = {
  label: string;
  value: number;
  isAbsolute?: boolean;
};

@Component({
  selector: 'app-game-page',
  imports: [DecimalPipe, PlayerSheet],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  protected readonly game = inject(GameService);
  private readonly router = inject(Router);

  choose(choiceId: string): void {
    this.game.choose(choiceId);
  }

  continueAfterOutcome(): void {
    this.game.continueAfterOutcome();

    if (this.game.isFinished()) {
      void this.router.navigate(['/juego/final']);
    }
  }

  restart(): void {
    this.game.restart();
  }

  protected getOutcomeEffects(effects: StatEffects): OutcomeEffect[] {
    return [
      ...(effects.salary === undefined
        ? []
        : [{ label: 'Salario anual', value: effects.salary, isAbsolute: true }]),
      ...(effects.salaryIncrease === undefined
        ? []
        : [{ label: 'Cambio salarial', value: effects.salaryIncrease, isAbsolute: true }]),
      { label: 'Experiencia', value: effects.experience ?? 0 },
      { label: 'Reputación', value: effects.reputation ?? 0 },
      { label: 'Estrés', value: effects.stress ?? 0 },
    ].filter(({ value }) => value !== 0);
  }
}
