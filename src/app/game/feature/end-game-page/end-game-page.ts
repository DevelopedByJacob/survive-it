import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { GameService } from '../../data-access/game.service';
import { GameArchiveService } from '../../data-access/game-archive.service';
import { ACHIEVEMENTS } from '../../data/achievements.data';
import { SCENES } from '../../data/scenes.data';
import { findScene } from '../../domain/scene-selection';
import { EndingCatalog } from '../../ui/ending-catalog/ending-catalog';
import { PlayerSheet } from '../../ui/player-sheet/player-sheet';

const CAREER_LABELS: Record<string, string> = {
  development: 'Desarrollo',
  qa: 'QA',
  product: 'Producto',
  data: 'Datos',
  devops: 'DevOps',
  security: 'Seguridad',
};

@Component({
  selector: 'app-end-game-page',
  imports: [DecimalPipe, EndingCatalog, PlayerSheet, RouterLink],
  templateUrl: './end-game-page.html',
  styleUrl: './end-game-page.scss',
})
export class EndGamePage {
  protected readonly game = inject(GameService);
  private readonly archive = inject(GameArchiveService);
  private readonly router = inject(Router);
  protected readonly achievementDefinitions = ACHIEVEMENTS;
  private readonly achievementIcons = new Set([
    'amor-incondicional',
    'estresado',
    'forrado',
    'jefe',
    'maestro-del-afterwork',
    'retiro-campestre',
    'take-my-money',
  ]);

  protected readonly shareFeedback = signal<string | null>(null);
  protected readonly expandedHintId = signal<string | null>(null);

  protected readonly companies = computed(() => {
    const history = this.game.state()?.salaryHistory ?? [];

    return [
      ...new Set(history.flatMap((change) => (change.companyName ? [change.companyName] : []))),
    ];
  });

  protected readonly endingTitle = computed(() => {
    const state = this.game.state();
    const endingScene = state ? findScene(SCENES, state.currentSceneId) : null;

    return endingScene?.title ?? (state ? `${state.player.name}, sobreviviste a IT` : '');
  });

  protected readonly unlockedAchievementCount = computed(
    () => this.archive.unlockedAchievementIds().length,
  );
  protected readonly totalAchievementCount = ACHIEVEMENTS.length;
  protected readonly discoveredEndingIds = this.archive.discoveredEndingIds;

  restart(): void {
    this.game.restart();
    void this.router.navigate(['/juego']);
  }

  protected isAchievementUnlocked(achievementId: string): boolean {
    return this.archive.unlockedAchievementIds().includes(achievementId);
  }

  protected toggleHint(achievementId: string): void {
    this.expandedHintId.update((current) => (current === achievementId ? null : achievementId));
  }

  protected achievementIconSource(achievementId: string, unlocked: boolean): string | null {
    if (!this.achievementIcons.has(achievementId)) {
      return null;
    }

    return `/achievements/${achievementId}${unlocked ? '' : '-locked'}.svg`;
  }

  async share(): Promise<void> {
    const state = this.game.state();

    if (!state) {
      return;
    }

    const careerLabel = CAREER_LABELS[state.career.area] ?? state.career.area;
    const text = [
      `${state.player.name} sobrevivió a IT: ${this.endingTitle()}.`,
      `Carrera: ${careerLabel} · Año ${state.year}.`,
      `Dinero ganado en nómina: ${state.lifetimeEarnings.toLocaleString('es-ES')} €.`,
      `Logros: ${this.unlockedAchievementCount()}/${this.totalAchievementCount}.`,
    ].join('\n');

    if ('share' in navigator) {
      try {
        await navigator.share({ title: 'Survive IT', text });
        return;
      } catch {
        // El usuario canceló el share nativo o falló: probamos el fallback de portapapeles.
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      this.shareFeedback.set('Copiado al portapapeles');
    } catch {
      this.shareFeedback.set('No se pudo compartir el resultado');
    }

    setTimeout(() => this.shareFeedback.set(null), 3000);
  }
}
