import { CAREER_SPECIALIZATION_SCENES } from './scenes/career-specialization.scenes';
import { ENDING_SCENES } from './scenes/endings.scenes';
import { GENERAL_SCENES } from './scenes/general.scenes';
import { OPENING_SCENES } from './scenes/openings.scenes';

// Punto único de entrada para el motor. Añade aquí cualquier colección nueva.
export const SCENES = [
  ...OPENING_SCENES,
  ...CAREER_SPECIALIZATION_SCENES,
  ...GENERAL_SCENES,
  ...ENDING_SCENES,
];
