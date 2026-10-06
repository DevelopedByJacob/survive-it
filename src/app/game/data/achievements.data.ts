import { Achievement } from '../domain/achievement';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'primer-sueldo',
    title: 'Primer sueldo',
    description: 'Conseguiste cobrar por trabajar en IT.',
    rarity: 'silver',
    isUnlocked: (state) => state.hasEverHadSalary,
  },
  {
    id: 'cambio-de-carrera',
    title: 'Reinvención profesional',
    description: 'Cambiaste de área durante tu carrera.',
    rarity: 'silver',
    isUnlocked: (state) => state.flags.includes('cambio-de-carrera'),
  },
  {
    id: 'red-internacional',
    title: 'Red internacional',
    description: 'Construiste contactos fuera de tu burbuja profesional.',
    rarity: 'silver',
    isUnlocked: (state) => state.flags.includes('conocio-a-mill-takes'),
  },
  {
    id: 'retiro-campestre',
    title: 'Retiro campestre',
    description: 'Llegaste al límite y abandonaste IT por la paz del campo.',
    rarity: 'gold',
    isUnlocked: (state) => state.currentSceneId === 'retiro-al-campo',
  },
  {
    id: 'amor-incondicional',
    title: 'Amor incondicional',
    description:
      'A los 30 años, sin haber trabajado nunca, encontraste una vocación que no venía en ningún roadmap.',
    rarity: 'gold',
    isUnlocked: (state) => state.currentSceneId === 'amor-incontrolable',
  },
  {
    id: 'forrado',
    title: 'Millonetis',
    description: 'Amasaste 1,8 millones de euros o más durante tu carrera.',
    rarity: 'gold',
    isUnlocked: (state) => state.lifetimeEarnings >= 1_800_000,
  },
  {
    id: 'take-my-money',
    title: 'Take my money',
    description: 'Conseguiste una subida de 20.000 € o más de golpe.',
    rarity: 'gold',
    isUnlocked: (state) =>
      state.salaryHistory.some(
        (change) => change.previousSalary > 0 && change.salary - change.previousSalary >= 20_000,
      ),
  },
  {
    id: 'estresado',
    title: 'Burnout',
    description:
      'Llegaste a la jubilación con el estrés por las nubes, pero sin soltar el teclado.',
    rarity: 'gold',
    isUnlocked: (state) => state.currentSceneId === 'superviviente-cansado',
  },
  {
    id: 'jefe',
    title: 'Jefe',
    description: 'Creaste tu propio negocio.',
    rarity: 'gold',
    isUnlocked: (state) => state.flags.includes('creo-su-negocio'),
  },
  {
    id: 'maestro-del-afterwork',
    title: 'Maestro del afterwork',
    description: 'Convertiste una cerveza en una decisión de carrera.',
    rarity: 'silver',
    isUnlocked: (state) => state.flags.includes('maestro-del-afterwork'),
  },
];
