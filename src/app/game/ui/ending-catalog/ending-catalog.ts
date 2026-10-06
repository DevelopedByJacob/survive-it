import { Component, computed, input } from '@angular/core';

import { ENDINGS_CATALOG } from '../../data/endings-catalog.data';
import { SCENES } from '../../data/scenes.data';
import { findScene } from '../../domain/scene-selection';

type CatalogItem = {
  sceneId: string;
  title: string;
  hint: string;
  discovered: boolean;
};

@Component({
  selector: 'app-ending-catalog',
  templateUrl: './ending-catalog.html',
  styleUrl: './ending-catalog.scss',
})
export class EndingCatalog {
  readonly discoveredIds = input.required<string[]>();
  readonly currentEndingId = input<string | null>(null);

  // Se fija al crear el componente para que la pista no cambie mientras se está leyendo.
  private readonly hintSeed = Math.random();

  protected readonly items = computed<CatalogItem[]>(() => {
    const discovered = new Set(this.discoveredIds());

    return ENDINGS_CATALOG.map(({ sceneId, hint }) => ({
      sceneId,
      hint,
      title: findScene(SCENES, sceneId)?.title ?? sceneId,
      discovered: discovered.has(sceneId),
    }));
  });

  protected readonly discoveredCount = computed(
    () => this.items().filter(({ discovered }) => discovered).length,
  );

  protected readonly hintedSceneId = computed(() => {
    const pending = this.items().filter(({ discovered }) => !discovered);

    return pending.length ? pending[Math.floor(this.hintSeed * pending.length)].sceneId : null;
  });
}
