// ============================================================
// SPACE JOINTS — PORTFOLIO
// NÚCLEO — banderas de qué datos cargaron y helpers que usan
// varios de los otros scripts (nav.js, modal.js, reels.js, etc.)
// Va primero: todo lo demás depende de esto.
// ============================================================

// Todo el contenido (textos ES/EN, videos, tarjetas de trabajo, productos)
// vive en i18n.js / videos.js / work.js / products.js — agregar o editar
// algo ahí nunca requiere tocar ninguno de estos scripts.
const hasI18n = typeof I18N !== 'undefined';
const hasVideos = typeof VIDEOS !== 'undefined';
const hasWork = typeof WORK !== 'undefined';
const hasProducts = typeof PRODUCTS !== 'undefined';
if (!hasI18n) console.warn('i18n.js no se cargó — revisa que esté antes que los demás scripts en index.html');
if (!hasVideos) console.warn('videos.js no se cargó — revisa que esté antes que los demás scripts en index.html');
if (!hasWork) console.warn('work.js no se cargó — revisa que esté antes que los demás scripts en index.html');
if (!hasProducts) console.warn('products.js no se cargó — revisa que esté antes que los demás scripts en index.html');

// Escapa texto para meterlo seguro dentro de HTML/atributos — lo usan
// reels.js, shorts.js y tienda.js al armar tarjetas desde los .js de datos.
function escapeHTML(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return escapeHTML(str).replace(/"/g, '&quot;');
}
