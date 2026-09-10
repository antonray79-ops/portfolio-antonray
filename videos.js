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
  //
  // "clientes" es el mismo mecanismo pero fuera de las pestañas de
  // Reels — aparece arriba de las marcas en la sección Clientes.
  // Úsalo para un reel de spots/comerciales.
  reels: {
    rigging: "uUSTvOocdVQ",   // https://youtu.be/uUSTvOocdVQ
    scripting: "RCbAVlhtBRE", // https://youtu.be/RCbAVlhtBRE
    mocap: "DXeYSTxG2D0",     // https://youtu.be/DXeYSTxG2D0
    clientes: "6M0dyRBKo3w"   // https://youtu.be/6M0dyRBKo3w — reel de spots publicitarios
  },

  // ---- Breakdowns por pestaña (sección "Reels", opcional) -----
  // Tira horizontal de miniaturas que aparece DEBAJO de las tarjetas
  // de esa pestaña — nunca arriba, para que el demo principal siga
  // siendo lo primero que se ve. Si la lista está vacía, la tira ni
  // siquiera aparece (no ocupa espacio).
  //
  // Agrega tantos ids como quieras por pestaña; se abren en la misma
  // ventana modal que "Ver Reel" al hacerles clic.
  breakdowns: {
    rigging: [],
    scripting: [],
    mocap: []
  }

};
