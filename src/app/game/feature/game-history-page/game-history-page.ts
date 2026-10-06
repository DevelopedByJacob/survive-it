import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GameArchiveService } from '../../data-access/game-archive.service';
import { ACHIEVEMENTS } from '../../data/achievements.data';
import { CareerArea } from '../../domain/career';
import { GameSummary } from '../../domain/game-summary';
import { PlayerBackground } from '../../domain/player-profile';
import { AvatarSrcPipe } from '../../ui/avatar/avatar-src.pipe';

const CAREER_LABELS: Record<CareerArea, string> = {
  development: 'Desarrollo',
  qa: 'QA',
  product: 'Producto',
  data: 'Datos',
  devops: 'DevOps',
  security: 'Seguridad',
};
const BACKGROUND_LABELS: Record<PlayerBackground, string> = {
  'no-degree': 'Sin titulación',
  university: 'Carrera universitaria',
  bootcamp: 'Bootcamp/FP',
};

@Component({
  selector: 'app-game-history-page',
  imports: [AvatarSrcPipe, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './game-history-page.html',
  styleUrl: './game-history-page.scss',
})
export class GameHistoryPage {
  protected readonly archive = inject(GameArchiveService);
  private readonly selectedGameId = signal<string | null>(null);

  protected readonly selectedGame = computed(() => {
    const games = this.archive.games();
    const selectedId = this.selectedGameId();
    return games.find((game) => game.id === selectedId) ?? games[0] ?? null;
  });
  protected readonly careerLabels = CAREER_LABELS;
  protected readonly backgroundLabels = BACKGROUND_LABELS;
  protected readonly achievementDefinitions = ACHIEVEMENTS;

  selectGame(game: GameSummary): void {
    this.selectedGameId.set(game.id);
  }
}
