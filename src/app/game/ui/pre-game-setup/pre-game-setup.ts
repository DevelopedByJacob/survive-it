import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CareerArea } from '../../domain/career';
import { AvatarId, NewGameConfiguration, PlayerBackground } from '../../domain/player-profile';
import { AVATAR_OPTIONS } from '../avatar/avatar-options';

type RoleOption = {
  value: CareerArea;
  label: string;
  description: string;
};

@Component({
  selector: 'app-pre-game-setup',
  imports: [FormsModule],
  templateUrl: './pre-game-setup.html',
  styleUrl: './pre-game-setup.scss',
})
export class PreGameSetup implements OnInit {
  readonly savedName = input('');
  readonly gameStarted = output<NewGameConfiguration>();

  protected name = '';
  protected selectedRole: CareerArea | null = null;
  protected selectedBackground: PlayerBackground | null = null;
  protected selectedAvatarId: AvatarId | null = null;
  protected readonly avatars = AVATAR_OPTIONS;

  protected readonly roles: RoleOption[] = [
    {
      value: 'development',
      label: 'Desarrollo',
      description: 'Controlas el "hola mundo" y los bucles for.',
    },
    { value: 'qa', label: 'QA', description: 'Te pagan por navegar por la web.' },
    {
      value: 'product',
      label: 'Producto',
      description: 'Conviertes problemas en <s>más problemas</s> soluciones.',
    },
    { value: 'data', label: 'Datos', description: 'SELECT * FROM bugs;' },
    {
      value: 'devops',
      label: 'DevOps',
      description: 'Aún no sabes muy bien lo que hace, pero cobra más que tú.',
    },
    { value: 'security', label: 'Seguridad', description: 'Hacking por frustración.' },
  ];

  ngOnInit(): void {
    this.name = this.savedName();
  }

  protected get canStart(): boolean {
    return Boolean(
      this.name.trim() && this.selectedRole && this.selectedBackground && this.selectedAvatarId,
    );
  }

  protected startGame(): void {
    const name = this.name.trim();

    if (!name || !this.selectedRole || !this.selectedBackground || !this.selectedAvatarId) {
      return;
    }

    this.gameStarted.emit({
      name,
      background: this.selectedBackground,
      avatarId: this.selectedAvatarId,
      career: { area: this.selectedRole },
    });
  }
}
