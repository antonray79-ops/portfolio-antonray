// ============================================================
// VIDEOS — todo lo que se reproduce en el sitio
// ------------------------------------------------------------
// Los videos de los CLIENTES no están aquí, están en clientes.js
// (junto con las marcas). Aquí va el reel principal, la tira de
// clips de arriba, y lo de la sección Reels.
//
// Cómo sacar el ID de una liga de YouTube:
//   https://youtube.com/shorts/XJ4pn3oDILU?feature=share
//                              ^^^^^^^^^^^  el id es "XJ4pn3oDILU"
//   https://youtu.be/hp48qOfm4yo
//                    ^^^^^^^^^^^  el id es "hp48qOfm4yo"
// ============================================================

const VIDEOS = {

  // ---- Reel principal ----------------------------------------
  // El video que abre el primer botón del hero (Reel de Rigging)
  // y el "Rigging" del menú.
  reel: {
    id: "hp48qOfm4yo" // https://youtu.be/hp48qOfm4yo
  },

  // El video que abre el segundo botón del hero (Reel de Spots).
  // Es el mismo de la tira de Clientes; si lo cambias allá, cámbialo aquí también.
  reelSpots: {
    id: "6M0dyRBKo3w" // https://youtu.be/6M0dyRBKo3w
  },

  // ---- Tira de Clips (shorts) --------------------------------
  // La tira horizontal que va debajo del hero. Agrega o quita
  // renglones — el orden de la lista es el orden en que salen.
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

  // ---- Demo de cada pestaña de Reels -------------------------
  // El video grande que se ve arriba al entrar a cada pestaña.
  // Si pones null, esa pestaña arranca sin video.
  reels: {
    rigging:   "uUSTvOocdVQ", // https://youtu.be/uUSTvOocdVQ
    scripting: "RCbAVlhtBRE", // https://youtu.be/RCbAVlhtBRE
    mocap:     "DXeYSTxG2D0", // https://youtu.be/DXeYSTxG2D0
    xr:        "A88XAJgRDBg"  // https://youtu.be/A88XAJgRDBg — demo de apps VR / AR
  },

  // ---- Breakdowns de cada pestaña ----------------------------
  // Salen como tarjetas con miniatura debajo del demo. Al darles
  // clic, el video se reproduce ARRIBA, en el mismo reproductor
  // del demo — no abren ventana aparte. En celular se ven como
  // tira horizontal para no tener que bajar por cada uno.
  //
  // Para agregar uno, copia un renglón y cambia el id y el título:
  //   { id: "idDelVideo", titulo: "Cascade Rig — Breakdown" },
  breakdowns: {

    rigging: [
      // { id: "idDelVideo", titulo: "Cascade Rig — Breakdown" },
    ],

    scripting: [
      { id: "1ftUNxuw67A", titulo: "FaceClean — Demo" },                                              // https://youtu.be/1ftUNxuw67A
      { id: "0jXV3S4JmKc", titulo: "FacialPoseBuilder — How To Use" },                                // https://youtu.be/0jXV3S4JmKc
      { id: "Xx6XWnbGFnM", titulo: "Finger Retargeter v1.0 — Retarget Mocap Fingers to Rig Controls" }, // https://youtu.be/Xx6XWnbGFnM
      { id: "AGLhBjdmCzk", titulo: "FaceCSVPlayer — Install & Use Guide" },                            // https://youtu.be/AGLhBjdmCzk
    ],

    mocap: [
      // { id: "idDelVideo", titulo: "FaceClean — Breakdown" },
    ],

    xr: [
      // { id: "idDelVideo", titulo: "Honda — App de AR" },
    ]

  }

};
