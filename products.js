// ============================================================
// SPACE JOINTS — CATÁLOGO DE TIENDAS
// ------------------------------------------------------------
// Las tarjetas de la sección "Tienda" salen de aquí. Cada producto
// se muestra como la vista previa real de Gumroad (miniatura,
// precio y botón "I want this!" tal cual se ve en tu tienda) — no
// una tarjeta hecha a mano.
//
// Para agregar un producto nuevo a Gumroad necesitas DOS datos:
//   1. url  -> la liga normal del producto (rayant4.gumroad.com/l/...)
//   2. id   -> el "product id" corto que usa Gumroad para el embed.
//              Ábrelo en tu panel de Gumroad → Share → Embed, y copia
//              el valor de data-gumroad-product-id del código que te da.
//
// Si todavía no tienes esos dos datos, deja id: null y url: null —
// la tarjeta se muestra con el título y la descripción que pongas
// aquí, sin la vista previa, hasta que los agregues.
//
// Para agregar OTRA tienda (ArtStation, Etsy, lo que sea) más
// adelante: se agrega como una nueva lista aquí (por ejemplo
// "artstation: [...]"), y le pides a Claude que le arme su propia
// tira en la sección Tienda — la estructura ya está lista para eso.
// ============================================================

const PRODUCTS = {

  stores: {

    gumroad: [
      {
        title: "Finger Retargeter v1.0",
        id: "sjyrw",
        url: "https://rayant4.gumroad.com/l/FingerRetargeting"
      },
      {
        title: "Finger Retarget V2.0",
        id: "oyggm",
        url: "https://rayant4.gumroad.com/l/FinRetV2"
      },
      {
        title: "Facial Pose Builder",
        id: "yuvkc",
        url: "https://rayant4.gumroad.com/l/fpb"
      },
      {
        title: "Face CSV Player",
        id: "dzzmt",
        url: "https://rayant4.gumroad.com/l/fcsplayer"
      },
      {
        title: "Ribbon Script",
        desc: "Generador de sistemas ribbon para rigs de alta deformación.",
        descEn: "Ribbon system generator for high-deformation rigs.",
        id: null,
        url: null
      }
    ]

  }

};
