// ============================================================
// CLIENTES — marcas con las que has trabajado y sus videos
// ------------------------------------------------------------
// Dos cosas en un solo archivo: la tira de videos de arriba y
// la cuadrícula de marcas de abajo.
// ============================================================

const CLIENTES = {

  // ---- Tira de videos ----------------------------------------
  // Acepta spots horizontales (16:9) y shorts verticales (9:16)
  // mezclados en la misma tira; cada uno se acomoda solo. El
  // título sale debajo del video, para que se sepa de qué marca
  // es o qué se hizo.
  //
  // Para agregar uno, copia este renglón y cambia los datos:
  //   { id: "idDelVideo", titulo: "Marca — qué se hizo", vertical: false },
  //
  // vertical: true  → es un short/reel parado (9:16)
  // vertical: false → es un spot normal acostado (16:9)
  videos: [
    { id: "6M0dyRBKo3w", titulo: "Reel de spots publicitarios", vertical: false },
  ],

  // ---- Marcas ------------------------------------------------
  // Los cuadritos de abajo. Cada marca puede salir de dos formas:
  //
  //   { nombre: "Honda México" }                              -> sale el nombre escrito
  //   { nombre: "Honda México", logo: "honda.png" }           -> sale el logo
  //
  // El logo es el NOMBRE DEL ARCHIVO que pusiste en la carpeta
  // assets/logos/ — no la ruta completa. Si el archivo no existe
  // o está mal escrito, el cuadrito se cae de vuelta al nombre
  // escrito, así que el sitio nunca se rompe.
  //
  // Por default todos los logos se pintan de blanco para que se
  // vean parejos en el fondo oscuro (aunque el archivo original
  // sea de colores). Si alguna marca DEBE ir con sus colores,
  // agrégale  color: true  a ese renglón.
  //
  // En assets/logos/LEEME.md están las medidas y de dónde bajarlos.
  marcas: [
    { nombre: "Honda México",          logo: "honda.png" },
    { nombre: "TV Azteca",             logo: "tvazteca.png" },
    { nombre: "Marinela · Grupo Bimbo", logo: "marinela.png" },
    { nombre: "Lala",                  logo: "lala.png" },
    { nombre: "VISA",                  logo: "visa.png" },
    { nombre: "Garnier",               logo: "garnier.png" },
    { nombre: "CeraVe",                logo: "cerave.png" },
    { nombre: "Maybelline",            logo: "maybelline.png" },
    { nombre: "Telcel",                logo: "telcel.png" },
    { nombre: "Volaris",               logo: "volaris.png" }
  ]

};
