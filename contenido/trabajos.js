// ============================================================
// TRABAJOS — tarjetas de texto dentro de las pestañas de Reels
// ------------------------------------------------------------
// Son las tarjetas con sigla, título y descripción (tipo
// "Cascade Rig System"). Hoy las tres listas están vacías a
// propósito: las pestañas muestran puros videos de breakdown
// (ver videos.js) y el detalle de las herramientas vive en la
// tienda de Gumroad (ver tienda.js).
//
// Si algún día quieres volver a usarlas, descomenta un bloque
// (quítale las "//" del principio de cada renglón) o copia uno
// nuevo con este formato:
//
//   {
//     sigla:  "RIG",                              // 2-4 letras para la miniatura
//     titulo: { es: "Nombre", en: "Name" },        // o solo "Nombre" si no cambia
//     desc:   { es: "Qué es", en: "What it is" }
//   },
//
// El orden de cada lista es el orden en que se ven las tarjetas.
// Las tarjetas de texto salen ANTES que los videos de breakdown.
// ============================================================

const TRABAJOS = {

  rigging: [
    // {
    //   sigla: "RIG",
    //   titulo: "Cascade Rig System",
    //   desc: {
    //     es: "Sistema de rig modular con jerarquía orient → sdk → grp → ctrl, pensado para producción rápida sin sacrificar control de animador.",
    //     en: "Modular rig system with an orient → sdk → grp → ctrl hierarchy, built for fast production without giving up animator control."
    //   }
    // },
    // {
    //   sigla: "RIG",
    //   titulo: "ikStretchyLeg",
    //   desc: {
    //     es: "Pierna IK con stretch y (próximamente) Foot Reversal y Soft IK integrados.",
    //     en: "Stretchy IK leg with Foot Reversal and Soft IK coming soon."
    //   }
    // },
    // {
    //   sigla: "RIG",
    //   titulo: "TLALOC (UE 5.8)",
    //   desc: {
    //     es: "Deidad mesoamericana hero character con simulación Chaos Cloth en cinturón (15+ tiras) y penacho de plumas.",
    //     en: "Mesoamerican deity hero character with Chaos Cloth simulation on the belt (15+ hanging strips) and feather headpiece."
    //   }
    // },
  ],

  scripting: [
    // El código y las herramientas se venden en la tienda — ver tienda.js
  ],

  mocap: [
    // {
    //   sigla: "MC",
    //   titulo: "FaceClean",
    //   desc: {
    //     es: "App standalone de limpieza y retargeting de captura facial — pipeline video → MediaPipe → ARKit CSV.",
    //     en: "Standalone facial mocap cleanup and retargeting app — video → MediaPipe → ARKit CSV pipeline."
    //   }
    // },
  ]

};
