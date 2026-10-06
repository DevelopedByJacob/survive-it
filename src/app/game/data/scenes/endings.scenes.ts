import { Scene } from '../../domain/scene';

// Cierres: el motor solo los selecciona cuando termina la carrera o no quedan regulares.
// Compiten por prioridad igual que el resto de escenas: la de mayor prioridad que cumpla sus
// requisitos gana, y "cierre" (prioridad 0, sin requisitos) actúa de comodín si ninguna encaja.
// Jerarquía explícita entre los finales especiales (de más a menos prioritario) para que, si una
// partida cumple varios a la vez, siempre gane el mismo en vez de sortearlo: Magnate del Código >
// La Leyenda del Vibe Coding > Profe de bootcamp > Founder Fantasma > Nómada del CV >
// Eminencia del PowerPoint > Superviviente con Ojeras > Prácticas Eternas.
// (El Pelotazo Cripto y Streamer Accidental no compiten aquí: se alcanzan siempre de forma
// directa mediante una elección concreta en general.scenes.ts, viven ahí como escenas 'regular'.)
export const ENDING_SCENES: Scene[] = [
  {
    id: 'cierre',
    type: 'closing',
    title: 'El cierre de una etapa',
    description:
      'Miras atrás y repasas una carrera llena de decisiones, cambios y mensajes de Slack que nunca terminaste de leer.',
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Tu recorrido termina aquí. Has sobrevivido, aprendido y dejado una impresión en el mundo de IT.',
        },
      },
    ],
  },
  {
    id: 'magnate-del-codigo',
    type: 'closing',
    priority: 40,
    title: 'Magnate del Código',
    description:
      'Repasas tus cuentas una última vez. La cifra sigue pareciendo un error de redondeo, pero es real.',
    requirements: { minLifetimeEarnings: 1_800_000 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Te retiras como leyenda financiera del sector: acciones, bonus y algún que otro golpe de suerte te han dejado más dinero que a la mayoría de tus antiguos jefes. Las notificaciones de Slack ya no te dan miedo, tu asesor fiscal sí.',
        },
      },
    ],
  },
  {
    id: 'leyenda-del-vibe-coding',
    type: 'closing',
    priority: 30,
    title: 'La Leyenda del Vibe Coding',
    description:
      'Nunca escribiste una línea sin preguntarle antes a la IA, y aun así nadie recuerda un incidente grave con tu nombre.',
    requirements: { minReputation: 90, maxStress: 80 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Te vas del sector como una leyenda tranquila: dejaste que la IA picara el código mientras tú gestionabas expectativas, y aun así tu reputación quedó intachable. Generaciones de becarios seguirán citando tus prompts como si fueran escritura sagrada, sin saber que jamás perdiste el sueño por ello.',
        },
      },
    ],
  },
  {
    id: 'founder-fantasma',
    type: 'closing',
    priority: 25,
    title: 'Founder Fantasma',
    description:
      'Sigues teniendo el negocio dado de alta. Ya casi nadie te pregunta por él, y cuando lo hacen improvisas una respuesta optimista.',
    requirements: { requiredFlags: ['creo-su-negocio'], maxReputation: 45, maxSalary: 30_000 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'La startup nunca llegó a morir del todo, pero tampoco a vivir: sigue ahí, en modo mantenimiento, con un dominio pagado hasta 2031 y cero clientes activos. Vuelves a IT por cuenta ajena, pero en tu LinkedIn sigues siendo "Founder & CEO".',
        },
      },
    ],
  },
  {
    id: 'nomada-del-cv',
    type: 'closing',
    priority: 20,
    title: 'Nómada del CV',
    description:
      'Tu currículum ya no cabe en una página. Cada línea es una empresa, una mudanza de Slack a Teams y de vuelta a Slack.',
    requirements: { minSalaryChangeCount: 5 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Ninguna empresa consiguió quedarse contigo más de un par de años. Te convertiste en profesional del "gracias, pero me voy", coleccionando ofertas, contraofertas y despedidas de equipo con tarta incluida. Tu LinkedIn es un mapa de guerra.',
        },
      },
    ],
  },
  {
    id: 'profe-de-bootcamp',
    type: 'closing',
    // Por encima del Founder Fantasma: es el final más específico (exige background) y, si no,
    // el Founder se lo quitaba a la mayoría de jugadores de bootcamp con reputación baja.
    priority: 26,
    title: 'Profe de bootcamp',
    description:
      'Nunca se te dio especialmente bien programar, pero se te da sorprendentemente bien explicar por qué algo no compila.',
    requirements: { background: ['bootcamp'], maxReputation: 35 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Acabas dando clases en el mismo bootcamp que te formó a ti. Nunca terminaste de dominar el temario, pero explicas el síndrome del impostor con una autoridad que ningún profesor te dio jamás. Tus alumnos te adoran; el código de producción, nunca lo supo.',
        },
      },
    ],
  },
  {
    id: 'arquitecto-de-powerpoints',
    type: 'closing',
    priority: 12,
    title: 'Eminencia del PowerPoint',
    description:
      'Tu carpeta de "Roadmap_v17_final_definitivo.pptx" pesa más que cualquier repositorio que hayas tocado.',
    requirements: { career: { area: 'product' }, minReputation: 80, maxSalary: 40_000 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Te vas del sector como una eminencia del roadmap: nadie discute tus prioridades trimestrales, todo el mundo cita tus diapositivas en reuniones a las que ni siquiera asististe. El sueldo nunca terminó de acompañar a la reputación, pero la reputación, esa sí que la tienes intacta.',
        },
      },
    ],
  },
  {
    id: 'superviviente-cansado',
    type: 'closing',
    priority: 10,
    title: 'Superviviente con Ojeras',
    description:
      'Llegas al final con la espalda cargada de años de guardias, pero sigues aquí. Nunca soltaste el teclado del todo.',
    requirements: { minStress: 90 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Aguantaste hasta el final. No fuiste al campo, no montaste un negocio, no te retiraste con una fortuna: simplemente seguiste apareciendo, incidente tras incidente, hasta que la carrera te dejó terminarla de pie. El estrés te acompañó todo el camino, pero nunca te ganó del todo.',
        },
      },
    ],
  },
  {
    id: 'becario-eterno',
    type: 'closing',
    priority: 5,
    title: 'Prácticas Eternas',
    description:
      'Llevas más años en el sector que muchos managers que has tenido, y sigues cobrando prácticamente lo mismo que el primer día.',
    requirements: { minContributionYears: 20, maxSalary: 22_000, maxSalaryChangeCount: 1 },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Te retiras con una experiencia enorme y una nómina que se ha quedado congelada en el tiempo. Nunca pediste una subida, nunca cambiaste de empresa, y ahora tienes la paz mental rarísima de quien ya no espera nada distinto.',
        },
      },
    ],
  },
];
