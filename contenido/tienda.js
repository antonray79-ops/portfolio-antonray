// ============================================================
// TIENDA — productos que se venden (sección "Tienda")
// ------------------------------------------------------------
// Cada producto se muestra con la vista previa real de Gumroad:
// miniatura, precio y botón de compra, tal cual se ve en tu
// tienda. Para eso necesita DOS datos:
//
//   url — la liga normal del producto (rayant4.gumroad.com/l/...)
//   id  — el "product id" corto del embed. Lo sacas en Gumroad:
//         entra al producto → Share → Embed, y copia el valor de
//         data-gumroad-product-id del código que te da.
//
// Si todavía no tienes esos dos datos, déjalos en null y pon un
// titulo + desc: se muestra una tarjeta simple de texto mientras
// tanto, en vez de la vista previa.
//
// Para agregar un producto, copia un bloque completo (desde la
// llave { hasta la llave },) y cambia los datos.
//
// Para vender en OTRA tienda además de Gumroad (ArtStation, etc.)
// se agrega otra lista aquí abajo y se le pide a Claude su propia
// tira en la sección Tienda — la estructura ya está lista.
// ============================================================

const TIENDA = {

  gumroad: [

    {
      titulo: "Finger Retargeter v1.0",
      id: "sjyrw",
      url: "https://rayant4.gumroad.com/l/FingerRetargeting"
    },

    {
      titulo: "Finger Retarget V2.0",
      id: "oyggm",
      url: "https://rayant4.gumroad.com/l/FinRetV2"
    },

    {
      titulo: "Facial Pose Builder",
      id: "yuvkc",
      url: "https://rayant4.gumroad.com/l/fpb"
    },

    {
      titulo: "Face CSV Player",
      id: "dzzmt",
      url: "https://rayant4.gumroad.com/l/fcsplayer"
    }

  ]

};
