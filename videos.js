// ============================================================
// SPACE JOINTS — CATÁLOGO DE VIDEOS
// ------------------------------------------------------------
// Todos los videos del sitio se controlan desde este archivo.
// Para agregar, quitar o cambiar un video, solo edita las listas
// de abajo — no hace falta tocar index.html ni script.js.
//
// Cómo sacar el ID de una liga de YouTube:
//   https://youtube.com/shorts/XJ4pn3oDILU?feature=share
//                              ^^^^^^^^^^^^ eso es el id -> "XJ4pn3oDILU"
//   https://youtu.be/hp48qOfm4yo
//                     ^^^^^^^^^^^^ eso es el id -> "hp48qOfm4yo"
// ============================================================

const VIDEOS = {

  // ---- Reel principal --------------------------------------
  // Es el video de la sección "Ver Reel" del hero, arriba de todo.
  reel: {
    id: "hp48qOfm4yo" // https://youtu.be/hp48qOfm4yo
  },

  // ---- Tira de Clips (shorts) --------------------------------
  // La tira horizontal debajo del hero. Agrega o quita líneas —
  // el orden de la lista es el orden en que aparecen en la tira.
  shorts: [
    "XJ4pn3oDILU",
    "XCvin_4PB4w",
    "X1sU8mrPp_s",
    "4TfSkFqWUN0",
    "fpwaoHINEYQ",
    "MKnKUDn17bs",
    "yXDI_Vle3ys",
    "0Ipac8k9mAI",
    "GBfyC6l5dX0"
  ],

  // ---- Reel por categoría (sección "Reels", opcional) --------
  // Si le pones un id a alguna de estas, aparece un video arriba
  // de las tarjetas de esa pestaña (Rigging / Scripting / Motion
  // Capture). Si la dejas en null, esa pestaña se queda solo con
  // las tarjetas de texto, como está ahora.
  reels: {
    rigging: null,
    scripting: null,
    mocap: null
  }

};
