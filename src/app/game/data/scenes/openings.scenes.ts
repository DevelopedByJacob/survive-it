import { Scene } from '../../domain/scene';

// Escenas iniciales: una dedicada a cada background y una alternativa genérica.
// "inicio" no tiene prioridad, así que hoy nunca sale: es la red de seguridad si se añade un
// background sin apertura propia (sin ninguna apertura compatible, startGame lanzaría un error).
export const OPENING_SCENES: Scene[] = [
  {
    id: 'fiesta-o-siesta',
    type: 'opening',
    priority: 1,
    title: '¿Fiesta o siesta?',
    description:
      'El día de tu graduación llegas a la fiesta después de meses de encierro estudiando. Tu mejor amiga te sonríe pasándote una copa cuando vibra el móvil: una recruiter de Macrosoft te propone una entrevista mañana a las 8.',
    requirements: { background: ['university'] },
    choices: [
      {
        id: 'dormir-para-la-entrevista',
        text: 'Dejar la copa e ir a casa a dormir',
        outcome: {
          text: 'Haces la entrevista con la mente despejada, pero tu currículum es solo uno más entre las 87.354.834 candidaturas que se presentaron y las 4.258 que contactaron. Te perdiste tu graduación por nada.',
        },
        effects: { stress: 10, reputation: -5 },
      },
      {
        id: 'disfrutar-la-noche',
        text: 'Ignorar el móvil y disfrutar de la noche',
        outcome: {
          text: 'Pasas una noche maravillosa con tus compañeros. ¿Quién necesita un sueldo siendo casapapis?',
        },
        effects: { stress: -10, reputation: 5 },
      },
      {
        id: 'fiesta-y-entrevista',
        text: 'Disfrutar de la fiesta y acudir mañana a la entrevista',
        outcome: {
          text: 'En la entrevista fallas hasta diciendo tu nombre. Sabes que jamás trabajarás en Macrosoft, pero que te quiten lo bailado.',
        },
        effects: { stress: 15, reputation: 5 },
        addFlags: ['contra-macrosoft'],
      },
    ],
  },
  {
    id: 'la-llamada',
    type: 'opening',
    priority: 1,
    title: 'La llamada',
    description:
      'Un recruiter te llama por teléfono muy interesado en tu perfil. Tras unas preguntas sobre tu currículum, llega la decisiva: ¿cuánta experiencia laboral tienes realmente?',
    requirements: { background: ['no-degree'] },
    choices: [
      {
        id: 'exagerar-practicas',
        text: 'Mentir y exagerar las prácticas, rezando para que no pidan tu vida laboral',
        outcome: {
          text: 'Sale bien. Te ofrecen 21.000 € al año y guardas silencio sobre esos meses que aparecieron por arte de magia.',
        },
        effects: { salary: 21000, reputation: 5 },
      },
      {
        id: 'ser-sincero-sobre-practicas',
        text: 'Decir la verdad: hiciste prácticas y el resto del tiempo te formaste',
        outcome: {
          text: 'La sinceridad se premia. Te ofrecen 18.000 € al año y puedes respirar con calma.',
        },
        effects: { salary: 18000, stress: -5 },
      },
      {
        id: 'colgar-y-echar-lol',
        text: 'Colgar del susto y echarte un LOL',
        outcome: { text: 'A ver si salimos ya de Oro.' },
        effects: { stress: -10, reputation: -10 },
      },
    ],
  },
  {
    id: 'el-demo-day',
    type: 'opening',
    priority: 1,
    title: 'El Demo Day',
    description:
      'Es el último día del Bootcamp/FP. Tu proyecto final funciona en tu portátil, siempre que nadie pulse F5, cierre sesión o pregunte qué hace ese botón. Una consultora ha venido a “conocer talento junior”.',
    requirements: { background: ['bootcamp'] },
    choices: [
      {
        id: 'demo-sin-tocar-nada',
        text: 'Hacer la demo sin tocar nada que funcione',
        outcome: {
          text: 'La demo sale sorprendentemente bien. Alguien de la consultora te añade en LinkedIn y escribe “gran actitud” sin haber visto el repositorio.',
        },
        effects: { reputation: 5, stress: 10 },
      },
      {
        id: 'explicar-prototipo',
        text: 'Explicar con honestidad qué partes son prototipo',
        outcome: {
          text: 'Dices que el login está “en proceso de integración”. La reclutadora agradece tu sinceridad; tu profesor deja de mirarte con decepción.',
        },
        effects: { stress: -5, reputation: 5 },
      },
      {
        id: 'culpar-al-wifi',
        text: 'Culpar al Wi-Fi cuando el proyecto deja de responder',
        outcome: {
          text: 'El Wi-Fi, por una vez, sí era parte del problema. Nadie sabe qué ocurrió, pero consigues cerrar la demo antes de que revisen el código.',
        },
        effects: { stress: 5, reputation: -5 },
      },
    ],
  },
  {
    id: 'inicio',
    type: 'opening',
    title: 'Lunes, 08:57',
    description:
      'Acabas de terminar tu formación. Tienes dos oportunidades sobre la mesa: una entrevista para una startup y una plaza en un programa de prácticas exigente.',
    choices: [
      {
        id: 'ir-a-la-entrevista',
        text: 'Ir a la entrevista de la startup',
        outcome: {
          text: 'Respiras hondo, repasas tus proyectos y cruzas la puerta de la oficina.',
        },
        effects: { stress: 5 },
      },
      {
        id: 'aceptar-practicas',
        text: 'Aceptar las prácticas para ganar experiencia',
        outcome: {
          text: 'Aceptas la oferta. El sueldo es modesto, pero el acceso a producción llega antes de lo esperado.',
        },
        effects: { experience: 5, stress: 10 },
        addFlags: ['practicas'],
      },
    ],
  },
];
