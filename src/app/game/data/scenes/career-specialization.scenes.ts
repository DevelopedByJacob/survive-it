import { Scene } from '../../domain/scene';

// Escenas obligatorias de especialización, agrupadas por área profesional.
export const CAREER_SPECIALIZATION_SCENES: Scene[] = [
  // Desarrollo
  {
    id: 'el-primer-camino',
    type: 'regular',
    priority: 90,
    title: 'El primer camino',
    description:
      'Tu carrera ya está elegida, pero llega la pregunta que divide equipos, amistades y grupos de Telegram: ¿en qué vas a especializarte?',
    requirements: { minSalary: 1, career: { area: 'development' } },
    choices: [
      {
        id: 'especialidad-frontend',
        text: 'Frontend: mover píxeles hasta que el botón quede exactamente dos píxeles más a la izquierda',
        outcome: {
          text: 'El navegador ya es tu hábitat natural. Empiezas a tener opiniones fuertes sobre los border-radius.',
        },
        setCareer: { area: 'development', specialization: 'frontend' },
      },
      {
        id: 'especialidad-backend',
        text: 'Backend: vivir entre APIs, bases de datos y mensajes que empiezan por “el endpoint devuelve 500”',
        outcome: {
          text: 'Aprendes que todo funciona perfectamente hasta que alguien intenta usarlo.',
        },
        setCareer: { area: 'development', specialization: 'backend' },
      },
      {
        id: 'especialidad-fullstack',
        text: 'Fullstack: decir que puedes hacerlo todo y descubrir que, en efecto, ahora te piden hacerlo todo',
        outcome: { text: 'Ganas versatilidad y una lista de tareas que ocupa más que tu monitor.' },
        setCareer: { area: 'development', specialization: 'fullstack' },
      },
      {
        id: 'especialidad-mobile',
        text: 'Mobile: hacer que las cosas funcionen en un dispositivo que alguien compró en 2014',
        outcome: {
          text: 'El emulador tarda en arrancar lo suficiente como para que reconsideres tus decisiones vitales.',
        },
        setCareer: { area: 'development', specialization: 'mobile' },
      },
    ],
  },
  // QA
  {
    id: 'el-bug-que-no-se-reproduce',
    type: 'regular',
    priority: 90,
    title: 'El bug que no se reproduce',
    description:
      'Te enseñan un vídeo de un error que solo ocurre los martes, en producción y cuando Mercurio está retrógrado. Te preguntan cómo quieres perseguirlo.',
    requirements: { minSalary: 1, career: { area: 'qa' } },
    choices: [
      {
        id: 'especialidad-qa-manual',
        text: 'QA manual: reproducirlo con paciencia, café y una pestaña privada',
        outcome: {
          text: 'Encuentras el fallo al cuarto intento. Nadie sabe cómo, pero ya te han añadido a todas las reuniones.',
        },
        setCareer: { area: 'qa', specialization: 'manual' },
      },
      {
        id: 'especialidad-qa-automation',
        text: 'QA automation: escribir un test para que el bug tenga que presentarse formalmente',
        outcome: {
          text: 'El test falla de forma preciosa. Ahora solo falta explicar por qué falla también en tu portátil.',
        },
        setCareer: { area: 'qa', specialization: 'automation' },
      },
      {
        id: 'especialidad-qa-performance',
        text: 'Performance: abrir 4.000 pestañas y llamar a eso una prueba de carga',
        outcome: {
          text: 'El sistema sobrevive. Tu ordenador no, pero el informe queda espectacular.',
        },
        setCareer: { area: 'qa', specialization: 'performance' },
      },
    ],
  },
  // Producto
  {
    id: 'el-roadmap-en-servilleta',
    type: 'regular',
    priority: 90,
    title: 'El roadmap en una servilleta',
    description:
      'Alguien ha dibujado el futuro del producto entre dos manchas de café. Todo el mundo asiente como si fuera una profecía.',
    requirements: { minSalary: 1, career: { area: 'product' } },
    choices: [
      {
        id: 'especialidad-product-owner',
        text: 'Product Owner: ordenar el caos y convertir deseos en un backlog infinito',
        outcome: {
          text: 'Tu backlog crece, se reproduce y pronto necesitará su propio Product Owner.',
        },
        setCareer: { area: 'product', specialization: 'product-owner' },
      },
      {
        id: 'especialidad-product-manager',
        text: 'Product Manager: decidir qué problema resolver mientras todos proponen el suyo',
        outcome: {
          text: 'Creas una presentación con una flecha ascendente. De pronto, la estrategia parece existir.',
        },
        setCareer: { area: 'product', specialization: 'product-manager' },
      },
    ],
  },
  // Datos
  {
    id: 'el-csv-maldito',
    type: 'regular',
    priority: 90,
    title: 'El CSV maldito',
    description:
      'Te entregan un CSV llamado final_final_ahora_si.csv con 48 columnas, fechas imposibles y una celda que contiene “N/A pero más o menos”.',
    requirements: { minSalary: 1, career: { area: 'data' } },
    choices: [
      {
        id: 'especialidad-data-engineering',
        text: 'Data Engineering: construir tuberías para que el caos llegue limpio a otro sitio',
        outcome: {
          text: 'La tubería funciona. Ahora hay tres copias del CSV, pero todas están en la nube.',
        },
        setCareer: { area: 'data', specialization: 'data-engineering' },
      },
      {
        id: 'especialidad-data-analysis',
        text: 'Data Analysis: buscar una historia en las columnas y defenderla con gráficos de colores',
        outcome: {
          text: 'Encuentras una tendencia. Nadie entiende la causalidad, pero el gráfico tiene degradado.',
        },
        setCareer: { area: 'data', specialization: 'data-analysis' },
      },
      {
        id: 'especialidad-machine-learning',
        text: 'Machine Learning: pedirle a un modelo que adivine qué significa la columna “cosas”',
        outcome: {
          text: 'El modelo acierta un 51%. Lo llamas baseline y alguien pregunta cuándo estará en producción.',
        },
        setCareer: { area: 'data', specialization: 'machine-learning' },
      },
    ],
  },
  // DevOps
  {
    id: 'la-alerta-de-las-317',
    type: 'regular',
    priority: 90,
    title: 'La alerta de las 3:17',
    description:
      'Una alerta suena a las 3:17 de la madrugada. No sabes qué servicio falla, pero el dashboard tiene mucho rojo y eso nunca trae buenas noticias.',
    requirements: { minSalary: 1, career: { area: 'devops' } },
    choices: [
      {
        id: 'especialidad-cloud',
        text: 'Cloud: confiar en que algún proveedor resuelva el problema por una factura adicional',
        outcome: {
          text: 'Pulsas un botón con un nombre tranquilizador. El coste mensual sube, pero el gráfico deja de gritar.',
        },
        setCareer: { area: 'devops', specialization: 'cloud' },
      },
      {
        id: 'especialidad-platform',
        text: 'Platform: construir una plataforma para que nadie vuelva a preguntarte dónde está el botón',
        outcome: {
          text: 'La plataforma tiene documentación. Nadie la leerá, pero existe y eso cuenta.',
        },
        setCareer: { area: 'devops', specialization: 'platform' },
      },
      {
        id: 'especialidad-sre',
        text: 'SRE: medir la fiabilidad, el sueño perdido y la paciencia del equipo',
        outcome: {
          text: 'Creas un SLO. El servicio incumple el SLO inmediatamente, pero ahora lo hace con métricas.',
        },
        setCareer: { area: 'devops', specialization: 'sre' },
      },
    ],
  },
  // Seguridad
  {
    id: 'la-contrasena-de-produccion',
    type: 'regular',
    priority: 90,
    title: 'La contraseña de producción',
    description:
      'Encuentras una contraseña en un documento compartido. Se llama password_final_definitiva.txt y fue creada por alguien que ya no trabaja aquí.',
    requirements: { minSalary: 1, career: { area: 'security' } },
    choices: [
      {
        id: 'especialidad-appsec',
        text: 'AppSec: convencer a desarrollo de que la seguridad no es una fase del viernes',
        outcome: {
          text: 'Abres un ticket de seguridad. Desarrollo lo marca como “para el siguiente sprint”, que es una dimensión temporal.',
        },
        setCareer: { area: 'security', specialization: 'appsec' },
      },
      {
        id: 'especialidad-pentesting',
        text: 'Pentesting: intentar entrar antes de que lo haga alguien con peores intenciones',
        outcome: {
          text: 'Encuentras tres agujeros y una nota que dice “no tocar, funciona”. Decides tocarlo con cuidado.',
        },
        setCareer: { area: 'security', specialization: 'pentesting' },
      },
      {
        id: 'especialidad-soc',
        text: 'SOC: vigilar alertas hasta distinguir un ataque de un compañero instalando una extensión rara',
        outcome: {
          text: 'La alerta era falsa. Aun así, ya sabes el nombre del gato de media empresa por sus contraseñas filtradas.',
        },
        setCareer: { area: 'security', specialization: 'soc' },
      },
    ],
  },
];
