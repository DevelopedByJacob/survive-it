// Catálogo de finales que el jugador puede coleccionar. Cada entrada apunta a una escena que
// termina la partida (un cierre o una escena regular con una elección `endsGame`) y aporta la
// pista que se muestra, de una en una, mientras siga sin descubrir.
export interface EndingCatalogEntry {
  sceneId: string;
  hint: string;
}

export const ENDINGS_CATALOG: EndingCatalogEntry[] = [
  { sceneId: 'cierre', hint: 'Llega a la jubilación sin destacar en nada en particular.' },
  { sceneId: 'amor-incontrolable', hint: 'Llega a los 30 sin haber trabajado nunca.' },
  { sceneId: 'retiro-al-campo', hint: 'Deja que el estrés llegue al máximo.' },
  {
    sceneId: 'pelotazo-cripto',
    hint: 'Una reunión aburrida y un grupo de Telegram con muchos cohetes.',
  },
  {
    sceneId: 'streamer-accidental',
    hint: 'Acepta un encargo de alto perfil e improvisa cuando todo falle.',
  },
  { sceneId: 'magnate-del-codigo', hint: 'Acumula muchísimo dinero a lo largo de tu carrera.' },
  {
    sceneId: 'leyenda-del-vibe-coding',
    hint: 'Una reputación intachable y los nervios bajo control.',
  },
  { sceneId: 'founder-fantasma', hint: 'Monta tu propio negocio… y que no te vaya muy bien.' },
  { sceneId: 'nomada-del-cv', hint: 'Nunca digas que no a un cambio de sueldo.' },
  {
    sceneId: 'profe-de-bootcamp',
    hint: 'Sal de un bootcamp y deja que tu reputación toque fondo.',
  },
  { sceneId: 'arquitecto-de-powerpoints', hint: 'Mucho prestigio en Producto, poco sueldo.' },
  { sceneId: 'superviviente-cansado', hint: 'Llega a los 65 al borde del colapso.' },
  {
    sceneId: 'becario-eterno',
    hint: 'Muchos años cotizados, sueldo congelado y nada de cambios.',
  },
];
