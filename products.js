// ============================================================
// SPACE JOINTS — CATÁLOGO DE GUMROAD
// ------------------------------------------------------------
// Las tarjetas de la pestaña "Gumroad" (dentro de Reels) salen de
// aquí. Para agregar un producto nuevo, copia un bloque de abajo,
// cambia el título, la descripción y la liga (el "Buy on" que te
// da Gumroad al generar el botón — solo necesitas el href).
//
// Si todavía no tienes la liga de compra, deja url: null y la
// tarjeta se muestra igual (título + descripción) pero sin botón
// de "Comprar" — puedes agregarla después sin perder el resto.
// ============================================================

const PRODUCTS = {

  gumroad: [
    {
      title: "Finger Retarget Tool",
      desc: "Herramienta comercial de retargeting de dedos para Maya.",
      descEn: "Commercial finger retargeting tool for Maya.",
      url: "https://rayant4.gumroad.com/l/FingerRetargeting"
    },
    {
      title: "Finger Retarget Tool v2.0",
      desc: "Retargeting de dedos con sistema de presets versionado.",
      descEn: "Finger retargeting with a versioned preset system.",
      url: "https://rayant4.gumroad.com/l/FinRetV2"
    },
    {
      title: "PoseSaverFaceTool",
      desc: "Guardado y recall de poses faciales para animación de personajes.",
      descEn: "Save and recall facial poses for character animation.",
      url: "https://rayant4.gumroad.com/l/fpb"
    },
    {
      title: "FaceCSV Player",
      desc: "Reproductor/importador de datos de captura facial en formato CSV directo en Maya.",
      descEn: "Facial capture CSV player/importer, straight into Maya.",
      url: "https://rayant4.gumroad.com/l/fcsplayer"
    },
    {
      title: "Ribbon Script",
      desc: "Generador de sistemas ribbon para rigs de alta deformación.",
      descEn: "Ribbon system generator for high-deformation rigs.",
      url: null
    }
  ]

};
