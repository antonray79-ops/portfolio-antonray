// ============================================================
// EXPERIENCIA Y EDUCACIÓN
// ------------------------------------------------------------
// La línea de tiempo de trabajos y las tarjetas de estudios.
// Para agregar un trabajo nuevo, copia un bloque completo (desde
// la llave { hasta la llave },) y cámbiale los datos. El primero
// de la lista es el que sale hasta arriba.
//
// Los textos que cambian con el botón ES/EN se escriben como
// { es: "...", en: "..." }. Si algo se escribe igual en los dos
// idiomas (un nombre de empresa, por ejemplo), basta con ponerlo
// entre comillas normales.
// ============================================================

const EXPERIENCIA = {

  trabajos: [

    {
      empresa: "Vizeonic",
      fechas: { es: "2016 — Presente", en: "2016 — Present" },
      puesto: "Founder · VFX Supervisor",
      desc: {
        es: "Estudio de virtual production propio. Dirección de proyectos de VFX, motion capture y pipelines en tiempo real para cine, TV, publicidad y eventos en vivo — incluyendo comerciales de TV Azteca para el Mundial Qatar y México 2026, la campaña VISA Mundial México, y el pipeline completo de MoCap para el personaje virtual de Marinela en su presentación en vivo en el Auditorio Nacional.",
        en: "My own virtual production studio. Leading VFX, motion capture, and real-time pipeline projects for film, TV, advertising, and live events — including TV Azteca commercials for the Qatar and Mexico 2026 World Cups, the VISA World Cup Mexico campaign, and the full MoCap pipeline for Marinela's virtual character at its live performance at Auditorio Nacional."
      }
    },

    {
      empresa: "Orionn",
      fechas: "",
      puesto: "MoCap Supervisor · VFX Supervisor",
      desc: {
        es: "Supervisión de captura de movimiento y de efectos visuales según el proyecto — participación multidisciplinaria a lo largo de distintas producciones.",
        en: "Supervised motion capture and visual effects depending on the project — multidisciplinary work across different productions."
      }
    },

    {
      empresa: "3D Lala Studio",
      fechas: "",
      puesto: { es: "Character Rigger", en: "Character Rigger" },
      desc: {
        es: "Rigging de personajes para producción 3D.",
        en: "Character rigging for 3D production."
      }
    }

  ],

  // ---- Educación ---------------------------------------------
  // etiqueta = el cuadrito ámbar de arriba de la tarjeta.
  // escuela  = opcional, déjalo en "" si no quieres que salga.
  educacion: [

    {
      etiqueta: "MBA",
      titulo: { es: "Maestría en Administración de Negocios", en: "Master of Business Administration" },
      escuela: ""
    },

    {
      etiqueta: "B.Eng.",
      titulo: "Interactive Technology & Digital Animation",
      escuela: "Universidad del Valle de México"
    }

  ]

};
