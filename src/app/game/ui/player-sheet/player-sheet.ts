import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { CareerArea } from '../../domain/career';
import { GameState } from '../../domain/game-state';
import { PlayerBackground } from '../../domain/player-profile';
import { AvatarSrcPipe } from '../avatar/avatar-src.pipe';

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
  bootcamp: 'Bootcamp',
};

const SPECIALIZATION_LABELS: Partial<Record<string, string>> = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Fullstack',
  mobile: 'Mobile',
  manual: 'QA manual',
  automation: 'QA automation',
  performance: 'QA performance',
  'product-owner': 'Product Owner',
  'product-manager': 'Product Manager',
  'data-engineering': 'Data Engineering',
  'data-analysis': 'Data Analysis',
  'machine-learning': 'Machine Learning',
  cloud: 'Cloud',
  platform: 'Platform',
  sre: 'SRE',
  appsec: 'AppSec',
  pentesting: 'Pentesting',
  soc: 'SOC',
};

@Component({
  selector: 'app-player-sheet',
  imports: [AvatarSrcPipe, DecimalPipe],
  templateUrl: './player-sheet.html',
  styleUrl: './player-sheet.scss',
})
export class PlayerSheet {
  readonly state = input.required<GameState>();

  protected readonly careerLabels = CAREER_LABELS;
  protected readonly backgroundLabels = BACKGROUND_LABELS;
  protected readonly specializationLabels = SPECIALIZATION_LABELS;

  protected statLevel(value: number): number {
    return Math.max(0, Math.min(100, value));
  }
}
