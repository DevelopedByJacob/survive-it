# Flujo narrativo de Survive IT

Las escenas se definen en `src/app/game/data/scenes.data.ts`. El motor filtra por requisitos, conserva la prioridad más alta y escoge aleatoriamente entre las escenas empatadas.

```mermaid
flowchart TD
  partida([Inicio de partida]) --> apertura{Escena opening compatible}

  apertura -. Carrera universitaria .-> fiesta[¿Fiesta o siesta?]
  apertura -. Sin titulación .-> llamada[La llamada]
  apertura -. Bootcamp/FP .-> demo[El Demo Day]
  apertura -. Otro perfil .-> inicio[Lunes, 08:57]

  fiesta --> outcome[Outcome + efectos]
  llamada --> outcome
  demo --> outcome
  inicio --> outcome

  outcome --> tiempo{Avance temporal}
  tiempo -. 1.ª decisión .-> arranque_uno[25 → 27 · +2 años]
  tiempo -. 2.ª decisión .-> arranque_dos[27 → 29 · +2 años]
  tiempo -. 3.ª decisión .-> arranque_tres[29 → 30 · +1 año]
  tiempo -. Desde los 30 .-> quinquenal[+5 años]

  arranque_uno --> pool
  arranque_dos --> pool
  arranque_tres --> pool
  quinquenal --> pool
  pool{Pool de escenas regulares elegibles y no vistas}

  pool -. "Prioridad 90 · carrera elegida" .-> especializacion{Escena de especialización}
  especializacion -. Desarrollo .-> dev[El primer camino]
  especializacion -. QA .-> qa[El bug que no se reproduce]
  especializacion -. Producto .-> product[El roadmap en una servilleta]
  especializacion -. Datos .-> data[El CSV maldito]
  especializacion -. DevOps .-> ops[La alerta de las 3:17]
  especializacion -. Seguridad .-> security[La contraseña de producción]

  dev --> outcome
  qa --> outcome
  product --> outcome
  data --> outcome
  ops --> outcome
  security --> outcome

  pool -. aleatorio .-> entrevista[La entrevista técnica]
  pool -. aleatorio .-> despliegue[Tu primer despliegue]
  pool -. aleatorio .-> incidente[Alerta en producción]
  pool -. aleatorio .-> slack[El Slack de las 9:03]
  pool -. aleatorio .-> reunion[La reunión que podía ser un email]
  pool -. aleatorio .-> afterwork[El afterwork de networking]
  pool -. "Edad 30 · salario 0 · sin empleo previo" .-> amor[El amor es incontrolable]

  entrevista --> outcome
  despliegue --> outcome
  incidente --> outcome
  slack --> outcome
  reunion --> outcome
  afterwork --> outcome
  amor --> final_anticipado([Final anticipado])

  pool -. Sin regulares o edad 65 .-> cierre[El cierre de una etapa]
  cierre --> final([Resumen de partida])

  classDef ending fill:#38bdf8,color:#082f49,stroke:#7dd3fc;
  class final ending;
```

Las escenas `opening` y `closing` no entran en el pool regular. Las regulares no se repiten salvo `repeatable: true`. Un `priority` más alto gana siempre sobre prioridades inferiores; si varias escenas comparten prioridad, se elige al azar entre ellas.
