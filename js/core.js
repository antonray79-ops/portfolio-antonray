// ============================================================
// SPACE JOINTS — PORTAFOLIO
// NÚCLEO — banderas de qué contenido cargó y ayudantes que usan
// los demás scripts (nav.js, reels.js, clientes.js, etc.)
// Va primero: todo lo demás depende de esto.
// ============================================================

// TODO el contenido editable vive en la carpeta contenido/ — ver
// contenido/LEEME.md. Estos scripts nunca se tocan para agregar o
// cambiar un video, un texto, un cliente o un producto.
const hayTextos       = typeof TEXTOS !== 'undefined';
const hayVideos       = typeof VIDEOS !== 'undefined';
const hayTrabajos     = typeof TRABAJOS !== 'undefined';
const hayTienda       = typeof TIENDA !== 'undefined';
const hayClientes     = typeof CLIENTES !== 'undefined';
const hayExperiencia  = typeof EXPERIENCIA !== 'undefined';
const hayCompetencias = typeof COMPETENCIAS !== 'undefined';
const hayContacto     = typeof CONTACTO !== 'undefined';

[['textos', hayTextos], ['videos', hayVideos], ['trabajos', hayTrabajos],
 ['tienda', hayTienda], ['clientes', hayClientes], ['experiencia', hayExperiencia],
 ['competencias', hayCompetencias], ['contacto', hayContacto]
].forEach(([nombre, cargo]) => {
  if (!cargo) console.warn(`contenido/${nombre}.js no cargó — revisa que el archivo exista y que esté listado en index.html`);
});

// Escapa texto para meterlo seguro dentro de HTML/atributos.
function escapeHTML(str) {
  return String(str === undefined || str === null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return escapeHTML(str).replace(/"/g, '&quot;');
}

// ---- Textos en dos idiomas ----------------------------------
// En contenido/ un texto se puede escribir de dos formas:
//   titulo: "Motion Capture"                        (igual en ambos)
//   titulo: { es: "Simulación", en: "Simulation" }  (cambia con ES/EN)
// Estas funciones hacen que las dos formas funcionen igual.
function textoES(valor) {
  if (valor && typeof valor === 'object') return valor.es || valor.en || '';
  return valor === undefined || valor === null ? '' : String(valor);
}
function textoEN(valor) {
  if (valor && typeof valor === 'object') return valor.en || valor.es || '';
  return valor === undefined || valor === null ? '' : String(valor);
}
// Atributos listos para pegar en una etiqueta: idioma.js los lee
// para cambiar el texto cuando le picas a ES / EN.
function attrsIdioma(valor) {
  return `data-es="${escapeAttr(textoES(valor))}" data-en="${escapeAttr(textoEN(valor))}"`;
}
