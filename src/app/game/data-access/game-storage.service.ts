import { Injectable } from '@angular/core';

import { SCENES } from '../data/scenes.data';
import { findScene } from '../domain/scene-selection';
import { GameState } from '../domain/game-state';

const PLAYER_NAME_STORAGE_KEY = 'survive-it.player-name';
const ACTIVE_GAME_STORAGE_KEY = 'survive-it.active-game';

@Injectable({ providedIn: 'root' })
export class GameStorageService {
  readPlayerName(): string {
    try {
      return localStorage.getItem(PLAYER_NAME_STORAGE_KEY) ?? '';
    } catch {
      return '';
    }
  }

  savePlayerName(name: string): void {
    try {
      localStorage.setItem(PLAYER_NAME_STORAGE_KEY, name);
    } catch {
      // La partida sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }

  readActiveGame(): GameState | null {
    try {
      const value = localStorage.getItem(ACTIVE_GAME_STORAGE_KEY);
      const parsed = value ? (JSON.parse(value) as GameState) : null;

      // El contenido de las escenas puede cambiar entre despliegues; si la partida guardada
      // apunta a una escena que ya no existe, se descarta en vez de dejar el juego bloqueado.
      if (
        !parsed ||
        typeof parsed.currentSceneId !== 'string' ||
        !findScene(SCENES, parsed.currentSceneId)
      ) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  persistActiveGame(state: GameState): void {
    try {
      localStorage.setItem(ACTIVE_GAME_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // La partida sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }
}
