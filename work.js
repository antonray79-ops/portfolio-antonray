// ============================================================
// SPACE JOINTS — CATÁLOGO DE TRABAJOS (pestañas de Reels)
// ------------------------------------------------------------
// Las tarjetas de "Cascade Rig System", "ikStretchyLeg", etc. que
// aparecen en cada pestaña (Rigging / Scripting / Motion Capture)
// se arman desde aquí. Para agregar, quitar, reordenar o editar un
// proyecto, solo edita las listas de abajo — no hace falta tocar
// index.html ni script.js.
//
// Cada tarjeta acepta:
//   thumb    — sigla corta para la miniatura (2-4 letras, ej. "RIG")
//   title    — título del proyecto
//   titleEn  — (opcional) título en inglés, solo si cambia con el
//              botón ES/EN. Si lo omites, el título no se traduce.
//   desc     — descripción en español
//   descEn   — descripción en inglés
//
// El orden de cada lista es el orden en que se ven las tarjetas.
// ============================================================

const WORK = {

  rigging: [
    {
      thumb: "RIG",
      title: "Cascade Rig System",
      desc: "Sistema de rig modular con jerarquía orient → sdk → grp → ctrl, pensado para producción rápida sin sacrificar control de animador.",
      descEn: "Modular rig system with an orient → sdk → grp → ctrl hierarchy, built for fast production without giving up animator control."
    },
    {
      thumb: "RIG",
      title: "ikStretchyLeg",
      desc: "Pierna IK con stretch y (próximamente) Foot Reversal y Soft IK integrados.",
      descEn: "Stretchy IK leg with Foot Reversal and Soft IK coming soon."
    },
    {
      thumb: "RIG",
      title: "Rail Spine",
      desc: "Columna basada en rieles para deformación fluida en personajes hero.",
      descEn: "Rail-based spine for fluid deformation on hero characters."
    },
    {
      thumb: "RIG",
      title: "TLALOC (UE 5.8)",
      desc: "Deidad mesoamericana hero character con simulación Chaos Cloth en cinturón (15+ tiras) y penacho de plumas.",
      descEn: "Mesoamerican deity hero character with Chaos Cloth simulation on the belt (15+ hanging strips) and feather headpiece."
    }
  ],

  // Vacío a propósito: esta pestaña ahora solo muestra videos de
  // breakdown (VIDEOS.breakdowns.scripting en videos.js) — el detalle
  // de cada herramienta de código ya vive en la tienda de Gumroad
  // (products.js). Tarjetas originales, por si algún día se quiere
  // regresar a este formato:
  // {
  //   thumb: "PY",
  //   title: "myTools Compendium",
  //   desc: "Launcher central en PySide2/PySide6 para todas mis herramientas de rigging en Maya, con manejo de ventana vía shiboken + MQtUtil.",
  //   descEn: "Central launcher in PySide2/PySide6 for all my Maya rigging tools, with window handling via shiboken + MQtUtil."
  // },
  // {
  //   thumb: "PY",
  //   title: "Finger Retarget Tool v2.0",
  //   desc: "Retargeting de dedos con sistema de presets versionado.",
  //   descEn: "Finger retargeting with a versioned preset system."
  // },
  // {
  //   thumb: "PY",
  //   title: "FaceCSV Player",
  //   desc: "Reproductor/importador de datos de captura facial en formato CSV directo en Maya.",
  //   descEn: "Facial capture CSV player/importer, straight into Maya."
  // }
  scripting: [],

  mocap: [
    {
      thumb: "MC",
      title: "FaceClean",
      desc: "App standalone de limpieza y retargeting de captura facial — pipeline video → MediaPipe → ARKit CSV.",
      descEn: "Standalone facial mocap cleanup and retargeting app — video → MediaPipe → ARKit CSV pipeline."
    },
    {
      thumb: "MC",
      title: "Pipeline Rokoko + Vicon",
      desc: "Captura full-body con Rokoko Smartsuit Pro y Smartgloves, más laboratorio Vicon para proyectos de alta precisión.",
      descEn: "Full-body capture with Rokoko Smartsuit Pro and Smartgloves, plus a Vicon lab for high-precision projects."
    },
    {
      thumb: "MC",
      title: "Marinela — Auditorio Nacional",
      desc: "Pipeline completo de MoCap para personaje virtual en presentación en vivo.",
      descEn: "Full MoCap pipeline for a virtual character in a live performance."
    }
  ]

};
