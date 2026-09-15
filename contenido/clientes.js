// ============================================================
// CLIENTES — marcas con las que has trabajado y sus videos
// ------------------------------------------------------------
// Dos cosas en un solo archivo: la tira de videos de arriba y
// la cuadrícula de nombres de marcas de abajo.
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
  // Los cuadritos con nombres de abajo. Agrega o quita renglones;
  // el orden de la lista es el orden en que se ven.
  marcas: [
    "Honda México",
    "TV Azteca",
    "Marinela · Grupo Bimbo",
    "VISA",
    "Garnier",
    "CeraVe",
    "Maybelline",
    "Telcel",
    "Volaris"
  ]

};
