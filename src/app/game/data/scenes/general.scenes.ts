import { Scene } from '../../domain/scene';

// Escenas comunes: válidas para cualquier perfil salvo que indiquen requisitos.
export const GENERAL_SCENES: Scene[] = [
  {
    id: 'primer-dia',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'Cambio de proyecto',
    description:
      'Es tu primer día en un nuevo proyecto. Un cambio pequeño debe llegar a producción antes de que acabe la mañana, pero la documentación está desactualizada.',
    choices: [
      {
        id: 'pedir-contexto',
        text: 'Pedir contexto a un compañero antes de tocar nada',
        outcome: {
          text: 'Tu compañero te explica una dependencia crítica que no aparecía en la documentación.',
        },
        effects: { experience: 10, reputation: 5, stress: -5 },
      },
      {
        id: 'desplegar-rapido',
        text: 'Desplegar rápido para demostrar iniciativa',
        outcome: {
          text: 'El cambio llega a producción. Durante unos minutos parece que todo ha salido bien. Luego deja de funcionar una cosa aparentemente no relacionada y, por alguna razón que nadie consigue explicar, ahora es tu problema hasta que se arregle. Adiós a la tarde.',
        },
        effects: { experience: 5, stress: 10 },
        addFlags: ['sin-revision'],
      },
    ],
  },
  {
    id: 'incidente',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'Alerta en producción',
    description:
      'Cinco minutos después de que despliegues en producción, ves algo que no debería estar pasando. De momento nadie más parece haberse dado cuenta.',
    choices: [
      {
        id: 'comunicar-incidente',
        text: 'Avisar al equipo, revertir el despliegue y llamar a los mayores',
        outcome: {
          text: 'Hacéis rollback y todo vuelve a funcionar. Te felicitan por reaccionar rápido, lo cual confirma que el listón estaba peligrosamente bajo.',
        },
        effects: { reputation: 5, experience: 10, stress: 10 },
        addFlags: ['gestiono-incidente'],
      },
      {
        id: 'arreglar-en-silencio',
        text: 'Intentar arreglarlo antes de que descubran que has sido tú',
        outcome: {
          text: 'Durante siete gloriosos minutos crees que puedes salvarlo. Al octavo alguien pega tu commit en el chat y te delata: “Creo que con esta última subida nos lo hemos cargado...”.',
        },
        effects: { reputation: -10, stress: 20 },
        addFlags: ['oculto-incidente'],
      },
      {
        id: 'que-lo-arregle-otro',
        text: 'Quedan 10 minutos para que acabe tu jornada y con suerte nadie lo nota...',
        outcome: {
          text: 'Ocurre el milagro: alguien vuelve a desplegar sin haberse traído tus cambios y todo vuelve a funcionar. La combinada conjunta a veces trae cosas maravillosas.',
        },
        effects: { experience: 10, stress: -10 },
        addFlags: ['oculto-incidente'],
      },
    ],
  },
  {
    id: 'amor-incontrolable',
    type: 'regular',
    priority: 100,
    title: 'El amor es incontrolable',
    description:
      'A los 30 años, sin haber trabajado nunca en IT, conoces al amor de tu vida: una amable señora de 87 años, viuda, que curiosamente ganó la lotería hace unos meses.',
    requirements: {
      age: 30,
      salary: 0,
      hasEverHadSalary: false,
    },
    choices: [
      {
        id: 'aprender-bridge',
        text: 'Aprender bridge y acompañarla a sus meriendas',
        outcome: {
          text: 'Descubres que el bridge tiene más reglas que Angular y que las meriendas empiezan puntualmente a las cinco. Dejas el mundo IT sin haber trabajado nunca: tu nueva vocación es cuidar de tu pareja.',
        },
        endsGame: true,
      },
      {
        id: 'gestionar-bodega',
        text: 'Ayudarla a elegir un velero y gestionar su bodega',
        outcome: {
          text: 'El velero se llama Legacy Bug. Entre viajes, champán y revisiones de la herencia, dejas el mundo IT sin haber trabajado nunca: tu nueva vocación es cuidar de tu pareja.',
        },
        endsGame: true,
      },
    ],
  },
  {
    id: 'el-slack-de-las-903',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'El Slack de las 9:03',
    description:
      'Es lunes. Llevas tres minutos conectado y ya hay 47 mensajes sin leer, un hilo con 19 respuestas y alguien ha escrito “¿tenemos un minuto?” sin ningún contexto.',
    choices: [
      {
        id: 'responder-a-todo',
        text: 'Responder a todo inmediatamente para demostrar disponibilidad',
        outcome: {
          text: 'Tu velocidad impresiona al equipo. También acabas de aceptar dos reuniones y una tarea que no era tuya.',
        },
        effects: { reputation: 5, stress: 5 },
      },
      {
        id: 'silenciar-slack',
        text: 'Silenciar las notificaciones y preparar un café con calma',
        outcome: {
          text: 'El café está perfecto. Cuando vuelves, el problema ya se resolvió y alguien ha preguntado si sigues con vida.',
        },
        effects: { stress: -10, reputation: -5 },
        addFlags: ['silencio-slack'],
      },
      {
        id: 'organizar-el-caos',
        text: 'Crear una lista de tareas y pedir prioridades',
        outcome: {
          text: 'Nadie responde durante cinco minutos. Luego una persona te agradece que hayas convertido el caos en algo con casillas.',
        },
        effects: { experience: 5, stress: 5 },
      },
    ],
  },
  {
    id: 'la-reunion-que-podia-ser-un-email',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'La reunión que podía ser un email',
    description:
      'Te invitan a una reunión de una hora para decidir el color de un botón. Hay 14 asistentes, una presentación de 38 diapositivas y nadie parece saber quién decide.',
    choices: [
      {
        id: 'aportar-una-solucion',
        text: 'Proponer una opción concreta y pedir que alguien la decida',
        outcome: {
          text: 'Se hace un silencio incómodo. Alguien dice “me parece bien” y, de repente, la reunión termina 17 minutos antes.',
        },
        effects: { reputation: 5, stress: -5 },
      },
      {
        id: 'decir-email',
        text: 'Preguntar si esto no podía ser un email',
        outcome: {
          text: 'Técnicamente tienes razón. Estratégicamente acabas de descubrir que la persona que organizó la reunión es tu manager.',
        },
        effects: { reputation: -10, stress: -5 },
      },
      {
        id: 'fingir-problema-conexion',
        text: 'Fingir que tu conexión falla y desaparecer',
        outcome: {
          text: 'Desapareces con elegancia digital. Diez minutos después te llega el acta: hay tres tareas asignadas a tu nombre.',
        },
        effects: { stress: -10, reputation: -5 },
        addFlags: ['evito-reunion'],
      },
      {
        id: 'frase-de-kiko',
        text: 'Recordar las sabias palabras de Kiko: ¿de esto no se encargan los frontis?',
        outcome: {
          text: 'La sala se queda en silencio. Kiko estaría orgulloso; la persona de frontend que hay en la videollamada, algo menos.',
        },
        effects: { reputation: -5, stress: -5 },
        requirements: {
          excludedCareers: [{ area: 'development', specialization: 'frontend' }],
        },
        highlight: true,
      },
      {
        id: 'meter-todo-en-cripto',
        text: 'Abrir el móvil por debajo de la mesa y meterlo todo en la primera criptomoneda que te recomienden en un grupo de Telegram',
        outcome: {
          text: 'Dejas de escuchar el debate sobre el color del botón y entras en un canal de Telegram de 40.000 miembros y muchos cohetes 🚀. En dos clics mueves tus ahorros a un token llamado $MEETCOIN.',
        },
        effects: { stress: 10 },
        addFlags: ['metio-en-cripto'],
        nextSceneId: 'pelotazo-cripto',
      },
    ],
  },
  {
    id: 'afterwork-de-networking',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'El afterwork de networking',
    description:
      'El equipo propone un afterwork “totalmente opcional”. Todo el mundo está ya con la chaqueta puesta esperando en la puerta, y "con total libertad" decides acudir.',
    choices: [
      {
        id: 'hablar-con-desconocido',
        text: 'Hablar con alguien que no conoces y preguntar por su trabajo',
        outcome: {
          text: 'Descubres que su equipo busca gente. Intercambiáis contactos y consigues sobrevivir a una conversación sin mirar el móvil.',
        },
        effects: { reputation: 5, stress: 5 },
      },
      {
        id: 'quedarse-en-el-buffet',
        text: 'Contrarrestar tu incomodidad social con cerveza',
        outcome: {
          text: 'Una hora después, no sabes cómo, pero estás jugando a los dardos con un par de jefes de departamento. Sorprendentemente, les caes bien y, dos meses después, tienes una subida sorpresa.',
        },
        effects: { stress: -10, salaryIncrease: 3000, reputation: 5 },
        addFlags: ['maestro-del-afterwork'],
      },
      {
        id: 'inventar-compromiso',
        text: 'Tu gato tiene fiebre',
        outcome: {
          text: 'Nadie había oído hablar jamás de tu gato, ni siquiera tú.',
        },
        effects: { stress: -5, reputation: -15 },
      },
    ],
  },
  {
    id: 'colaboracion-con-midudev',
    type: 'regular',
    title: 'Un mensaje azul verificado',
    description:
      'Minudev te escribe para invitarte a colaborar en uno de sus vídeos. Tu perfil tiene más visitas de las que esperabas y tu síndrome del impostor acaba de abrir una incidencia crítica.',
    requirements: { minSalary: 1, minReputation: 81 },
    choices: [
      {
        id: 'aceptar-colaboracion-midudev',
        text: 'Aceptar salir en su stream y en su posterior vídeo, después de todo ¿a quién le asustan unos pocos cientos de miles de vistas?',
        outcome: {
          text: 'El vídeo sale bien, el chat te adopta durante cuarenta minutos y logras no hacer el ridículo.',
        },
        effects: { reputation: 10, stress: 10 },
        addFlags: ['colaboro-con-midudev'],
      },
      {
        id: 'rechazar-colaboracion-midudev',
        text: 'Agradecer la invitación y seguir siendo una leyenda local',
        outcome: {
          text: 'Pasas una tarde tranquila pescando en Stardew Valley. La fama tendrá que esperar, pero el cortisol lo tienes bien controlado.',
        },
        effects: { stress: -10 },
      },
    ],
  },
  {
    id: 'la-charla-con-las-diapositivas',
    type: 'regular',
    title: 'Probemos esas soft skills',
    description:
      'Te invitan a dar una conferencia. Te prometen público, focos y una botella de agua con etiqueta personalizada: el nivel máximo de reconocimiento profesional.',
    requirements: { minSalary: 1, minReputation: 71 },
    choices: [
      {
        id: 'dar-charla-y-aceptar-stick-works',
        text: 'Dar la charla',
        outcome: {
          text: 'La charla recibe aplausos y Stick Works, el famoso CEO de Tomato, te espera entre bambalinas con una oferta que no puedes rechazar. El salario mejora; tu vida personal, en cambio, pide una excedencia.',
        },
        requirements: { excludedFlags: ['contra-tomato'] },
        effects: { salaryIncrease: 20000, stress: 15, reputation: 5 },
        addFlags: ['trabaja-en-tomato'],
        companyName: 'Tomato',
        highlight: true,
      },
      {
        id: 'dar-charla-contra-tomato',
        text: 'Dar la charla y explicar por qué los seres superiores utilizamos distribuciones Linux',
        outcome: {
          text: 'La charla funciona tremendamente bien, pero a la salida te encuentras cara a cara con Stick Works, el famoso CEO de Tomato, que te mira con desaprobación. Sabes que jamás trabajarás para Tomato.',
        },
        effects: { reputation: 10, stress: 10 },
        addFlags: ['contra-tomato'],
      },
      {
        id: 'rechazar-la-charla',
        text: 'Rechazarla: el mundo no está preparado para tu nivel de inglés',
        outcome: {
          text: 'El mundo pierde una gran charla y tú ganas una tarde viendo One Piece.',
        },
        effects: { stress: -10 },
      },
    ],
  },
  {
    id: 'toronto-o-tarta',
    type: 'regular',
    title: 'Toronto o tarta',
    description:
      'Te ofrecen acudir a una conferencia sobre las innovaciones de la IA en Toronto, con todos los gastos pagados. Coincide exactamente con el cumpleaños de tu madre.',
    requirements: { minSalary: 1, excludedCareers: [{ area: 'product' }, { area: 'qa' }] },
    choices: [
      {
        id: 'ir-a-toronto-y-conocer-a-mill-takes',
        text: 'Ir a Toronto y confiar en que una videollamada cuenta como estar',
        outcome: {
          text: 'Conoces a Mill Takes, el famoso CEO de Macrosoft, habláis de tecnología, de monopolios que no son monopolios y de por qué reiniciar sigue arreglando cosas en 2026. Sales con un contacto importante y una foto para LinkedIn.',
        },
        requirements: { excludedFlags: ['contra-macrosoft'] },
        effects: { reputation: 15, stress: 5 },
        addFlags: ['conocio-a-mill-takes'],
        highlight: true,
      },
      {
        id: 'ir-a-toronto-y-discutir-con-mill-takes',
        text: 'Ir a Toronto, tu madre ya sabe que la quieres',
        outcome: {
          text: 'Conoces a Mill Takes y, antes de que llegue el café, le explicas que Linux siempre fue mejor y que Apple al menos sabía hacer que las cosas parecieran terminadas. Mill deja de sonreír. La foto para LinkedIn parece una negociación de rehenes.',
        },
        requirements: { requiredFlags: ['contra-macrosoft'] },
        effects: { reputation: -25, stress: 20 },
      },
      {
        id: 'quedarse-al-cumpleanos',
        text: 'Quedarte a soplar velas y explicar que Toronto seguirá ahí',
        outcome: {
          text: 'Tu madre está feliz. La tarta también. El algoritmo de LinkedIn no se entera de nada, pero por una vez eso no importa.',
        },
        effects: { stress: -15, reputation: -5 },
      },
    ],
  },
  {
    id: 'la-llamada-de-mill-takes',
    type: 'regular',
    priority: 50,
    title: 'La llamada de Mill Takes',
    description:
      'Años después, Mill Takes recuerda aquella conversación en Toronto. Te propone liderar un pequeño equipo en España para Macrosoft: presupuesto, libertad técnica y una cantidad sospechosa de reuniones estratégicas.',
    requirements: {
      minSalary: 1,
      minAge: 40,
      maxAge: 60,
      minReputation: 80,
      minExperience: 75,
      requiredFlags: ['conocio-a-mill-takes'],
      excludedFlags: ['contra-macrosoft'],
    },
    choices: [
      {
        id: 'aceptar-laboratorio-mill-takes',
        text: 'Aceptar: nadie dijo que liderar fuera compatible con dormir',
        outcome: {
          text: 'Aceptas el trabajo. Tienes un equipo brillante, un presupuesto real y treinta pestañas abiertas con la palabra “estrategia” en el título.',
        },
        effects: { salaryIncrease: 25000, reputation: 10, stress: 20 },
        addFlags: ['lidera-laboratorio-mill-takes'],
        companyName: 'Macrosoft',
        highlight: true,
      },
      {
        id: 'asesorar-a-mill-takes',
        text: 'Quedarte como asesor: opinar con fundamento y salir antes de las seis',
        outcome: {
          text: 'Mantienes la relación, contribuyes a las decisiones importantes y descubres que “solo una consulta rápida” es una unidad de tiempo ficticia.',
        },
        effects: { salaryIncrease: 10000, reputation: 5, stress: 10 },
        addFlags: ['asesora-a-mill-takes'],
        companyName: 'Macrosoft',
      },
      {
        id: 'rechazar-oferta-mill-takes',
        text: 'Agradecer la llamada y proteger la paz que tanto te costó conseguir',
        outcome: {
          text: 'Mill Takes lo entiende. Te manda una taza corporativa que no tardas en tirar a la basura: quién sabe si lleva telemetría.',
        },
        effects: { stress: -10 },
      },
    ],
  },
  // Oportunidades profesionales para perfiles con una trayectoria consolidada.
  // Primeras ofertas de consultora: solo mientras el jugador siga sin empleo antes de los 30.
  {
    id: 'la-llamada-de-capgiminiiiii',
    type: 'regular',
    title: 'La llamada de Capgiminíííííííí',
    description:
      'Te llama un recruiter francés hablando un español impecable salvo por ser incapaz de pronunciar la erre. Te ofrece un puesto y te explica que, en un año, tendrás que defenderte en francés. “C’est très facil, ¿no?”',
    requirements: { salary: 0, maxAge: 29 },
    choices: [
      {
        id: 'aceptar-capgeminiiiii',
        text: 'Aceptar y cambiar la tostada por un croissant',
        outcome: {
          text: 'Te ofrecen 18.000 € al año. Empiezas el lunes y descubres que “petite réunion” puede durar dos horas y media.',
        },
        effects: { salary: 18000, stress: 10, experience: 10, reputation: 5 },
        addFlags: ['trabaja-en-capgiminiiiii'],
        companyName: 'Capgiminíííííííí',
      },
      {
        id: 'rechazar-capgeminiiiii',
        text: 'Contestas: "Roland Garros es el patio de Rafa Nadal, Pau Gasol siempre fue más que Tony Parker y la tortilla de patatas tiene más huevos que la francesa."',
        outcome: {
          text: 'Escuchas cómo te maldice en su limitado idioma antes de colgarte. No tendrás trabajo, pero sabes que los eliminamos de la última Eurocopa y del último Mundial.',
        },
        effects: { stress: -15 },
      },
    ],
  },
  {
    id: 'el-contacto-de-nft-rata',
    type: 'regular',
    title: 'El contacto de NFT RATA',
    description:
      'Un amigo que entró cuando aún se llamaba "Everest" te ha recomendado para un puesto. Dice que al principio le pagaban con un cuenco de arroz, pero desde que añaden pollo está encantado con la cultura de empresa.',
    requirements: { salary: 0, maxAge: 29 },
    choices: [
      {
        id: 'aceptar-nft-rata',
        text: 'Ir a la entrevista y preguntar discretamente por el pollo',
        outcome: {
          text: 'La entrevista sale bien. Te ofrecen 19.500 € al año, tarjeta de comida y la promesa de que el arroz es completamente metafórico.',
        },
        effects: { salary: 19500, stress: 5, experience: 10, reputation: 5 },
        addFlags: ['trabaja-en-nft-rata'],
        companyName: 'NFT RATA',
      },
      {
        id: 'dejar-pasar-nft-rata',
        text: 'Dejarlo pasar: tu espalda no está preparada para el látigo',
        outcome: {
          text: 'Tu amigo te manda una foto de su tupper con orgullo. Tú le das un like y continúas buscando algo con menos metáforas alimentarias.',
        },
        effects: { stress: -5 },
      },
    ],
  },
  {
    id: 'el-proyecto-eterno-de-indracula',
    type: 'regular',
    title: 'El proyecto eterno de Indrácula',
    description:
      'Indrácula busca talento para un proyecto “estratégico” que lleva activo desde una época en la que los monitores aún tenían espalda. Te aseguran que nadie trabaja de noche: simplemente el proyecto nunca duerme.',
    requirements: { salary: 0, maxAge: 29 },
    choices: [
      {
        id: 'aceptar-indracula',
        text: 'Aceptar la oferta y que te monitoricen hasta los clicks',
        outcome: {
          text: 'Te ofrecen 20.500 € al año. En la bienvenida te entregan un portátil, una tarjeta y un documento llamado versión_final_definitiva_2007.',
        },
        effects: { salary: 20500, experience: 10, stress: 10, reputation: 5 },
        addFlags: ['trabaja-en-indracula'],
        companyName: 'Indrácula',
      },
      {
        id: 'huir-de-indracula',
        text: 'Huir antes de que el proyecto te invite a quedarte para siempre',
        outcome: {
          text: 'Cierras la oferta justo cuando te dicen que el onboarding tiene una sección llamada “historia reciente: 1998–actualidad”.',
        },
        effects: { stress: -10 },
      },
    ],
  },
  {
    id: 'la-oferta-de-why',
    type: 'regular',
    title: 'La oferta de WHY',
    description:
      'WHY te ofrece un puesto de trabajo. Acudes a la sabiduría popular, aquel vídeo de Pantomima Full: muchas horas, mucho traje y la promesa de que algún día llegarás a 50k y serás el puto amo.',
    requirements: { salary: 0, maxAge: 29 },
    choices: [
      {
        id: 'aceptar-why',
        text: 'Aceptar: Rober Bodegas jamás me mentiría.',
        outcome: {
          text: 'De momento son 21.000 € al año y una agenda que parece una partida de Tetris perdida. Has palmado el sueldo de tres meses en ropa de oficina y llevas sin ver a tu pareja mes y medio.',
        },
        effects: { salary: 21000, reputation: 5, stress: 20, experience: 10 },
        addFlags: ['trabaja-en-why'],
        companyName: 'WHY',
      },
      {
        id: 'rechazar-why',
        text: 'Rechazarla: prefieres tener vida',
        outcome: {
          text: 'La recruiter asiente con una mirada que dice “ya volverás”. Tú vuelves a tu sofá, abres una bolsa de Doritos y sigues viendo The Boys.',
        },
        effects: { stress: -15 },
      },
    ],
  },
  {
    id: 'el-test-de-accentrune',
    type: 'regular',
    title: 'El test de Accentruñe',
    description:
      'Accentruñe te invita a un proceso de selección con cuatro entrevistas, una dinámica de grupo y un test que pregunta qué animal serías en una transformación digital.',
    requirements: { salary: 0, maxAge: 29 },
    choices: [
      {
        id: 'aceptar-accentrune',
        text: 'Hacer el test y asumir que eres un águila orientada a resultados',
        outcome: {
          text: 'El águila convence al comité. Te ofrecen 20.000 € al año, acceso a una plataforma de cursos y una contraseña con 19 requisitos de seguridad.',
        },
        effects: { salary: 20000, reputation: 5, stress: 10, experience: 10 },
        addFlags: ['trabaja-en-accentrune'],
        companyName: 'Accentruñe',
      },
      {
        id: 'cancelar-test-accentrune',
        text: 'Cancelar: tu tiempo vale más que jugar a las sillas con 6 NPCs',
        outcome: {
          text: 'Envías un correo educado. Cinco minutos después recibes una encuesta para valorar la experiencia de haber rechazado la experiencia.',
        },
        effects: { stress: -10 },
      },
    ],
  },
  {
    id: 'la-oferta-al-otro-lado-del-mapa',
    type: 'regular',
    title: 'El Techno no está tan mal',
    description:
      'Una empresa alemana ha visto tu perfil y te ofrece mudarte. El paquete incluye un salario enorme y ayuda para preguntar dónde está el pan sin señalarlo.',
    requirements: { minSalary: 1, minReputation: 70, minExperience: 70 },
    choices: [
      {
        id: 'aceptar-oferta-internacional',
        text: 'Aceptar, hacer las maletas y cambiar las croquetas por el currywurst',
        outcome: {
          text: 'No entiendes absolutamente nada los primeros tres meses, pero ver engordar tu cuenta a final de mes ayuda bastante.',
        },
        effects: { salaryIncrease: 25000, reputation: 10, experience: 15, stress: 20 },
        addFlags: ['experiencia-internacional'],
        companyName: 'Empresa internacional',
        highlight: true,
      },
      {
        id: 'rechazar-oferta-internacional',
        text: 'Rechazarla: en Alemania no hay terracitas, ni sol, ni felicidad',
        outcome: {
          text: 'El arrepentimiento por no haber aceptado ese salario te dura justo hasta que llegan las bravas y la ensaladilla esa misma tarde con tu amiga Eva.',
        },
        effects: { stress: -5 },
      },
    ],
  },
  {
    id: 'te-podrias-ser-tech-lead',
    type: 'regular',
    title: '¿Yo? ¿Tech Lead?',
    description:
      'Tu manager dice que el equipo confía en tu criterio. Es una forma elegante de comunicarte que ahora todos los problemas tendrán tu nombre en copia.',
    requirements: {
      minSalary: 1,
      minReputation: 70,
      minExperience: 70,
      excludedCareers: [{ area: 'product' }, { area: 'qa' }],
    },
    choices: [
      {
        id: 'aceptar-ser-tech-lead',
        text: 'Aceptar y aprender a decir “depende” con seguridad',
        outcome: {
          text: 'Recibes el ascenso, una subida salarial y el privilegio de descubrir que cada decisión técnica tiene siete reuniones de contexto.',
        },
        effects: { salaryIncrease: 15000, reputation: 10, stress: 20 },
        addFlags: ['es-tech-lead'],
        highlight: true,
      },
      {
        id: 'seguir-siendo-tecnico',
        text: 'Agradecer el cumplido e intentar rechazar con elegancia (los marrones para otro)',
        outcome: {
          text: 'Tu manager asiente y te dice que buscarán a alguien. Spoiler: eso no ocurre. Te comes los mismos marrones que si hubieras aceptado, pero sin subida de sueldo ni reconocimiento.',
        },
        effects: { stress: 30, reputation: -5 },
      },
    ],
  },
  {
    id: 'la-evolucion-natural-segun-tu-manager',
    type: 'regular',
    title: 'La evolución natural, según tu manager',
    description:
      'Te proponen dejar la trinchera técnica. “Te veo en un rol menos... técnico. Además con el avance de la IA...”, dice tu manager, como si tuvieras una lesión deportiva causada por los paréntesis mal cerrados.',
    requirements: {
      minSalary: 1,
      minAge: 50,
      minExperience: 60,
      excludedCareers: [{ area: 'product' }, { area: 'qa' }],
    },
    choices: [
      {
        id: 'pasarse-a-qa',
        text: 'Pasarte a QA: encontrar bugs antes de que encuentren producción',
        outcome: {
          text: 'Cambias de bando. Tus compañeros técnicos te miran con recelo, saben que usarás tus conocimientos para hacer el "mal".',
        },
        setCareer: { area: 'qa', specialization: 'manual' },
        effects: { reputation: 5, stress: -5 },
        addFlags: ['cambio-de-carrera'],
        highlight: true,
      },
      {
        id: 'pasarse-a-product-owner',
        text: 'Pasarte a Product Owner: o como antes te gustaba llamarles. "Los secretarios con ínfulas".',
        outcome: {
          text: 'Te entregan un backlog, tres stakeholders y la frase “solo es un cambio pequeño”. Dos meses después, no recuerdas qué es un json, pero tienes más reuniones que horas de trabajo.',
        },
        setCareer: { area: 'product', specialization: 'product-owner' },
        effects: { reputation: 5, stress: 10 },
        addFlags: ['cambio-de-carrera'],
        highlight: true,
      },
      {
        id: 'quedarse-en-lo-tecnico',
        text: 'Ignorar la recomendación y seguir en la parte técnica',
        outcome: {
          text: 'Abres VS Code y sonríes al volver a tu merge request con 8 conflictos infumables. Hogar, dulce hogar.',
        },
        effects: { experience: 10, stress: -5 },
      },
    ],
  },
  {
    id: 'la-revision-anual-que-dura-tres-meses',
    type: 'regular',
    title: 'La revisión anual que dura tres meses',
    description:
      'Tu manager anuncia la revisión de desempeño. El formulario tiene 47 preguntas, tres escalas distintas del 1 al 5 y una sección para explicar cómo encarnas los valores de la empresa sin usar “resiliencia”, “ownership” ni mentir demasiado.',
    requirements: { minSalary: 1, minExperience: 55, minAge: 28 },
    choices: [
      {
        id: 'negociar-en-la-revision',
        text: 'Negocias con resultados, métricas, siendo directo y pidiendo lo que crees que mereces',
        outcome: {
          text: 'Tu manager dice que tiene que “alinearlo internamente”. Tres semanas, dos silencios incómodos y un Excel misterioso después, consigues 2.000 € más. Una victoria es una victoria, aunque sea pequeña.',
        },
        effects: { salaryIncrease: 2000, reputation: 5, stress: 5, experience: 5 },
      },
      {
        id: 'aceptar-revision-sin-negociar',
        text: 'Rellenas el formulario y confías en que tu manager aprecie tu trabajo, sin pedir nada expresamente',
        outcome: {
          text: 'Recibes feedback excelente, una insignia virtual y la recomendación de “seguir haciendo exactamente lo mismo”. La insignia no sirve para pagar el alquiler, pero tiene un degradado precioso.',
        },
        effects: { reputation: 5, stress: -5 },
      },
    ],
  },
  {
    id: 'el-recruiter-que-no-es-un-bot',
    type: 'regular',
    title: 'El recruiter que no es un bot',
    description:
      'Te llega un mensaje por LinkedIn con tu nombre bien escrito, tu tecnología correcta y sin llamarte “estimado/a candidato/a”. Tras revisarlo dos veces, contemplas seriamente la posibilidad de que haya un ser humano al otro lado.',
    requirements: { minSalary: 1, minReputation: 60, minExperience: 60, minAge: 28 },
    choices: [
      {
        id: 'escuchar-oferta-linkedin',
        text: 'Responder con interés, la oferta no parece mala',
        outcome: {
          text: 'El mercado resulta conocerte a ti también y viene con 6.000 € más al año. Dos entrevistas después ya estás devolviendo un portátil y planeando renovar el coche, que ya tocaba.',
        },
        effects: { salaryIncrease: 6000, reputation: 5, stress: 5, experience: 10 },
        companyName: 'Empresa de LinkedIn',
      },
      {
        id: 'ignorar-oferta-linkedin',
        text: 'Ignorarlo: demasiado personalizado, claramente sospechoso, quieres conservar tus órganos',
        outcome: {
          text: 'Lo dejas en visto. Una semana después descubres que era una oferta buenísima y haces lo correcto: no volver a abrir esa conversación jamás.',
        },
        effects: { stress: -5 },
      },
      {
        id: 'hacerte-el-dificil',
        text: 'Responder educadamente pero sin mostrar interés',
        outcome: {
          text: 'Curiosamente, solo consigues que te busquen y te quieran fichar a toda costa. Dos entrevistas después ya estás devolviendo un portátil y planeando tu ansiado viaje a Japón.',
        },
        effects: { salaryIncrease: 12000, reputation: 5, stress: 10, experience: 15 },
        companyName: 'Empresa de LinkedIn',
      },
    ],
  },
  {
    id: 'la-promocion-que-no-viene-en-el-organigrama',
    type: 'regular',
    title: 'La promoción que no venía en el organigrama',
    description:
      'Una compañera se va y, por una extraña coincidencia, todas las preguntas que antes le hacían a ella empiezan a llegarte a ti. Tu manager detecta “una oportunidad de crecimiento”. Tú detectas una vacante.',
    requirements: { minSalary: 1, minReputation: 65, minExperience: 65, minAge: 30 },
    choices: [
      {
        id: 'aceptar-promocion-interna',
        text: 'Aceptar la promoción y descubrir qué significa realmente “tener visibilidad”',
        outcome: {
          text: 'No sabes muy bien cómo, pero ha ocurrido: te han subido el sueldo sin cambiar de empresa. Te pellizcas y confías en no despertar.',
        },
        effects: { salaryIncrease: 4000, reputation: 5, stress: 10, experience: 5 },
      },
      {
        id: 'rechazar-promocion-interna',
        text: 'Rechazarla antes de que “crecimiento” vuelva a significar trabajo gratis',
        outcome: {
          text: 'Tu manager lo acepta con sorprendente madurez. A la mañana siguiente te invita a una reunión llamada “Redistribución temporal de responsabilidades”.',
        },
        effects: { stress: 15 },
      },
    ],
  },
  {
    id: 'el-cliente-se-acuerda-de-tu-nombre',
    type: 'regular',
    title: 'El cliente se acuerda de tu nombre',
    description:
      'Aquel cliente del incidente recuerda que fuiste quien evitó convertir producción en un ataque de ansiedad conjunto. Ahora quiere ficharte directamente.',
    requirements: { minSalary: 1, minExperience: 60, requiredFlags: ['gestiono-incidente'] },
    choices: [
      {
        id: 'fichar-por-el-cliente',
        text: 'Aceptar: averiguar por fin cuánto pagaba realmente el cliente por ti',
        outcome: {
          text: 'Te ofrecen 12.000 € más al año y sigues saliendo MUCHO más rentable. De repente entiendes muchas cosas sobre los márgenes de consultoría que quizá era mejor no entender.',
        },
        effects: { salaryIncrease: 12000, reputation: 5, stress: 10, experience: 10 },
        companyName: 'El antiguo cliente',
        highlight: true,
      },
      {
        id: 'quedarse-con-la-consultora',
        text: 'Quedarte: el amor incondicional a tu manager no lo cubre una obscena subida salarial',
        outcome: {
          text: 'Tu manager celebra tu lealtad y promete tenerla muy en cuenta en la próxima revisión salarial. Por experiencia, calculas que eso equivale aproximadamente a 0 €.',
        },
        effects: { reputation: 5, stress: -5 },
      },
    ],
  },
  {
    id: 'la-certificacion-que-te-piden-en-linkedin',
    type: 'regular',
    title: 'La certificación que te piden en LinkedIn',
    description:
      'Un recruiter asegura que tu perfil sería perfecto con “una certificación más”. Al preguntar cuál, te manda un PDF con 92 siglas. Algunas parecen tecnologías; otras podrían ser matrículas.',
    requirements: { minSalary: 1, minExperience: 55 },
    choices: [
      {
        id: 'certificacion-desarrollo',
        text: 'Certificarte en arquitectura y aprender a dibujar rectángulos cada vez más caros',
        outcome: {
          text: 'Apruebas. Ya puedes representar un sistema entero con seis cajas y once flechas. La flecha que conecta con el legacy lleva un discreto signo de interrogación.',
        },
        requirements: { career: { area: 'development' } },
        effects: { experience: 15, reputation: 5, stress: 5 },
      },
      {
        id: 'certificacion-qa',
        text: 'Certificarte en testing y convertir “esto falla” en terminología homologada',
        outcome: {
          text: 'Apruebas con nota. Al día siguiente desarrollo te manda un bug cerrado como “Works as designed”. La certificación no incluye armas, por desgracia.',
        },
        requirements: { career: { area: 'qa' } },
        effects: { experience: 15, reputation: 5, stress: 5 },
      },
      {
        id: 'certificacion-producto',
        text: 'Certificarte en producto y obtener licencia oficial para mover post-its',
        outcome: {
          text: 'Aprendes siete herramientas para priorizar tareas y acabas utilizando la más antigua de todas: lo que grite más fuerte el cliente.',
        },
        requirements: { career: { area: 'product' } },
        effects: { experience: 15, reputation: 5, stress: 5 },
      },
      {
        id: 'certificacion-datos',
        text: 'Certificarte en datos y jurar que Excel no es una base de datos',
        outcome: {
          text: 'Apruebas. Dos horas después alguien te envía FINAL_DATOS_BUENO_AHORA_SI_v7.xlsx y pregunta si puedes montarle “algo de IA”.',
        },
        requirements: { career: { area: 'data' } },
        effects: { experience: 15, reputation: 5, stress: 5 },
      },
      {
        id: 'certificacion-devops',
        text: 'Certificarte en cloud y memorizar servicios que serán renombrados el mes que viene',
        outcome: {
          text: 'Apruebas. Tu recompensa es que, desde ese momento, cualquier cosa que falle entre un commit y producción pasa misteriosamente a ser “tema de DevOps”.',
        },
        requirements: { career: { area: 'devops' } },
        effects: { experience: 15, reputation: 5, stress: 5 },
      },
      {
        id: 'certificacion-seguridad',
        text: 'Certificarte en seguridad y empezar a desconfiar hasta del QR de la cafetería',
        outcome: {
          text: 'Apruebas y desarrollas el reflejo de preguntar “¿quién necesita realmente ese permiso?”. En tres días has dejado de caerle bien a media empresa. Excelente señal.',
        },
        requirements: { career: { area: 'security' } },
        effects: { experience: 10, reputation: 5, stress: 10 },
      },
    ],
  },
  {
    id: 'la-startup-con-mas-pitch-que-producto',
    type: 'regular',
    title: 'La startup con más pitch que producto',
    description:
      'Una startup te presenta una plataforma que combina IA, blockchain y una app para optimizar cuánta agua bebes. Todavía no tienen clientes, pero sí un vídeo corporativo grabado con dron y una slide que dice “TAM: 8 billion humans”.',
    requirements: { minSalary: 1, minReputation: 70, minExperience: 65, minAge: 30 },
    choices: [
      {
        id: 'unirse-a-la-startup',
        text: 'Unirte: puede que el equity no pague el alquiler, pero tiene porcentajes',
        outcome: {
          text: 'En seis meses haces backend, frontend, soporte, entrevistas y una mudanza de oficina. Tu cargo cambia tres veces y, técnicamente, ahora también eres Head of Something.',
        },
        effects: { salaryIncrease: 5000, experience: 15, reputation: 5, stress: 20 },
        companyName: 'Startup disruptiva',
      },
      {
        id: 'rechazar-la-startup',
        text: 'Rechazar: seguir hidratándote manualmente un tiempo más',
        outcome: {
          text: 'El fundador te dice que te estás perdiendo “el próximo unicornio”. Dos meses después vuelve a escribirte: ahora hacen IA para mascotas y se llaman completamente distinto.',
        },
        effects: { stress: -10 },
      },
    ],
  },
  {
    id: 'funda-tu-propio-negocio',
    type: 'regular',
    requirements: { minSalary: 1, minExperience: 60, minAge: 30 },
    title: 'Fundar tu propio negocio',
    description:
      'Llevas tiempo dándole vueltas a dejar de currar para otros. Tienes una idea, algo de red de contactos y, por primera vez, algo de dinero ahorrado.',
    choices: [
      {
        id: 'montarlo-con-colchon',
        text: 'Montarlo con un colchón de ahorros y un par de clientes ya cerrados',
        outcome: {
          text: 'El primer año es duro pero sostenible: facturas, pagas impuestos que no sabías que existían y, contra todo pronóstico, el negocio aguanta y hasta crece un poco.',
        },
        effects: { reputation: 10, salaryIncrease: 8000, stress: 10 },
        addFlags: ['creo-su-negocio'],
      },
      {
        id: 'dejarlo-todo-de-golpe',
        text: 'Dejar el curro de un día para otro y lanzarte sin red',
        outcome: {
          text: 'Renuncias con una carta motivacional que te sabes de memoria. Sin colchón ni clientes cerrados, los primeros meses son puro caos y vas quemando lo poco que tenías ahorrado. Lo único que te puedes pagar es un sueldo de supervivencia.',
        },
        // Salario absoluto y no un recorte: sin clientes, el negocio paga lo mismo tengas el
        // sueldo que tengas al dejar tu empleo.
        effects: { salary: 15000, reputation: -10, stress: 15 },
        addFlags: ['creo-su-negocio'],
      },
    ],
  },
  {
    id: 'la-web-de-la-velada',
    type: 'regular',
    requirements: { minSalary: 1, minReputation: 70 },
    title: 'La web de La Velada',
    description:
      'Ibai te escribe directamente por Discord: necesita que la web de venta de entradas de La Velada del Año aguante el chuzazo de tráfico sin caerse. Tienes un ticket, una fecha imposible y cero margen de error.',
    choices: [
      {
        id: 'currar-la-web-a-conciencia',
        text: 'Currarla a conciencia: caché, CDN y quince simulacros de carga',
        outcome: {
          text: 'La venta de entradas aguanta sin un solo error 500. Nadie se entera de lo cerca que estuvo de caerse, pero tú sí, y tu cuenta bancaria también.',
        },
        effects: { reputation: 10, salaryIncrease: 5000, stress: 15 },
      },
      {
        id: 'rechazar-el-encargo-de-ibai',
        text: 'Rechazar el encargo: tu salud mental no está para esa fecha imposible',
        outcome: {
          text: 'Contestas educadamente que no llegas a tiempo. Meses después ves la web caerse en directo desde el sofá, con el alivio de no ser tú quien recibe el mensaje a las 3 de la mañana.',
        },
        effects: { stress: -10 },
      },
      {
        id: 'improvisar-en-directo',
        text: 'Aceptar igualmente e improvisar en directo cuando algo falle',
        outcome: {
          text: 'El servidor cae a los tres minutos de abrir la venta. Ibai, en directo, te pide por Discord que lo arregles "ya" mientras miles de personas comentan el caos en el chat. Lo levantas a tiempo, pero el clip de tu cara de pánico compartiendo pantalla ya se ha hecho viral.',
        },
        effects: { stress: 20 },
        addFlags: ['viral-en-la-velada'],
        nextSceneId: 'streamer-accidental',
      },
    ],
  },
  // Finales anticipados.
  {
    id: 'retiro-al-campo',
    type: 'regular',
    priority: 200,
    title: 'El campo te está llamando',
    description:
      'Has llegado a un nivel de estrés en el que cada notificación suena como una amenaza personal. Ves una finca con gallinas, huerto y cobertura de móvil sospechosamente baja. Por primera vez en años, respiras.',
    requirements: { minSalary: 1, minStress: 100 },
    choices: [
      {
        id: 'retirarse-al-campo',
        text: 'Cambiar los despliegues por tomates y cuidar de las gallinas',
        outcome: {
          text: 'Abandonas el mundo IT, compras unas botas y aprendes que las gallinas tienen menos reuniones, pero muchas opiniones. Cultivas plantas, cuidas el corral y, contra todo pronóstico, vuelves a ser feliz.',
        },
        endsGame: true,
      },
    ],
  },
  {
    id: 'pelotazo-cripto',
    type: 'regular',
    title: 'El Pelotazo Cripto',
    description:
      'Ha pasado un tiempo. $MEETCOIN ha hecho algo que ninguna reunión ha conseguido jamás: moverse rápido de verdad.',
    requirements: { requiredFlags: ['metio-en-cripto'] },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: '$MEETCOIN se dispara un 4.000 %. Vendes en el pico exacto sin saber muy bien por qué, pagas unos impuestos que no entiendes del todo y dejas IT como la leyenda de oficina que "lo dejó todo por las criptomonedas y le salió bien". Nadie se lo explica, ni tú tampoco.',
        },
        endsGame: true,
      },
    ],
  },
  {
    id: 'streamer-accidental',
    type: 'regular',
    title: 'Streamer Accidental',
    description:
      'El clip de aquella caída no ha dejado de circular. Te reconocen por tu cara de pánico compartiendo pantalla más que por ningún commit que hayas hecho jamás.',
    requirements: { requiredFlags: ['viral-en-la-velada'] },
    choices: [
      {
        id: 'ver-resumen',
        text: 'Ver el resumen de tu partida',
        outcome: {
          text: 'Te ofrecen ser "la cara del servidor caído" en directo para el siguiente evento, y luego para el siguiente. Dejas IT sin haberlo decidido del todo: ahora tienes más seguidores que líneas de código en producción, y resulta que se vive bien así.',
        },
        endsGame: true,
      },
    ],
  },
  // Escenas de prueba añadidas para validar el flujo de contenido nuevo.
  {
    id: 'code-review-eterno',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'El code review que no acaba nunca',
    description:
      'Subes un pull request de 12 líneas. Cuatro horas y 38 comentarios después, alguien pregunta si deberíais "rediscutir la arquitectura desde cero".',
    choices: [
      {
        id: 'defender-el-pr',
        text: 'Defender cada línea con argumentos técnicos',
        outcome: {
          text: 'Ganas la discusión sobre nomenclatura de variables. Pierdes la tarde. El PR se mergea con un "LGTM" y un emoji de fuego.',
        },
        effects: { experience: 10, reputation: 5, stress: 10 },
      },
      {
        id: 'ceder-para-acabar',
        text: 'Aceptar todos los comentarios para cerrar cuanto antes',
        outcome: {
          text: 'El PR se mergea en diez minutos. Dos semanas después, uno de esos cambios "sin importancia" rompe algo en producción.',
        },
        effects: { experience: 5, stress: -5 },
        addFlags: ['pr-aprobado-sin-pelea'],
      },
      {
        id: 'pedir-una-llamada',
        text: 'Proponer una llamada de 15 minutos para resolverlo en directo',
        outcome: {
          text: 'La llamada dura 45 minutos, mezcla dos debates distintos, y termina con un "bueno, dejémoslo así por ahora". El PR se mergea igual.',
        },
        effects: { experience: 5, reputation: 5 },
      },
    ],
  },
  {
    id: 'guardia-a-las-3-de-la-manana',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'Guardia a las 3 de la madrugada',
    description:
      'Tu móvil vibra a las 3:12. Es PagerDuty: "Latencia crítica en el servicio de pagos". Llevas una semana de guardia y esta es la tercera alerta.',
    choices: [
      {
        id: 'levantarse-a-mirarlo',
        text: 'Levantarte y revisar los logs desde el portátil',
        outcome: {
          text: 'Encuentras un pod reiniciándose en bucle y lo arreglas en 20 minutos. Te vuelves a la cama, pero ya no consigues dormir.',
        },
        effects: { experience: 10, reputation: 5, stress: 15 },
      },
      {
        id: 'silenciar-hasta-manana',
        text: 'Silenciar la alerta y confiar en que se resuelva sola',
        outcome: {
          text: 'A las 8 de la mañana descubres que sí, se resolvió sola. También descubres que tu manager estuvo despierto desde las 3:15 intentando localizarte.',
        },
        effects: { reputation: -10, stress: -5 },
      },
      {
        id: 'despertar-a-un-companero',
        text: 'Escalar la alerta a un compañero de otro equipo',
        outcome: {
          text: 'Tu compañero lo resuelve en diez minutos y te lo recuerda educadamente durante los próximos tres meses.',
        },
        effects: { experience: 5, stress: -10 },
        addFlags: ['escala-guardias'],
      },
    ],
  },
  {
    id: 'la-estimacion-optimista',
    type: 'regular',
    requirements: { minSalary: 1 },
    title: 'La estimación optimista',
    description:
      'En el planning, alguien dice "eso es trivial, como mucho dos días". Tú sabes, en el fondo, que no es trivial.',
    choices: [
      {
        id: 'callar-y-asentir',
        text: 'Asentir y aceptar la estimación para no parecer lento',
        outcome: {
          text: 'Dos días se convierten en nueve. En el siguiente planning, "trivial" ya nadie se atreve a decirlo en voz alta.',
        },
        effects: { stress: 15, experience: 5 },
      },
      {
        id: 'defender-estimacion-realista',
        text: 'Defender una estimación más realista con datos de la última vez',
        outcome: {
          text: 'Ganas el debate a base de mostrar el histórico del sprint anterior. Alguien murmura que eres "muy pesimista". El plazo se cumple igualmente por primera vez en meses.',
        },
        effects: { reputation: 5, experience: 10, stress: -5 },
        addFlags: ['estimador-realista'],
      },
      {
        id: 'inflar-preventivamente',
        text: 'Inflar la estimación en secreto para tener margen',
        outcome: {
          text: 'Terminas la tarea en la mitad de tiempo estimado. Pasas el resto del sprint fingiendo que "todavía la estás puliendo".',
        },
        effects: { reputation: 5, stress: -10 },
      },
    ],
  },
];
