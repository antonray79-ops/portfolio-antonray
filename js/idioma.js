// ============================================================
// IDIOMA (ES / EN) — pinta todos los textos del sitio
// ------------------------------------------------------------
// Hay dos tipos de texto y esto maneja los dos:
//   1. data-txt="clave"  -> lo busca en contenido/textos.js
//   2. data-es / data-en -> lo trae la propia tarjeta (las que
//      arman reels.js, clientes.js, experiencia.js, etc.)
//
// Va HASTA EL FINAL de los scripts a propósito: necesita que
// todas las tarjetas ya existan para poder pintarlas.
// ============================================================

let IDIOMA = 'es';
function idiomaActual() { return IDIOMA; }

// Los " · " se pintan en ámbar (el puesto del hero los usa).
function conPuntos(texto) {
  return escapeHTML(texto).replace(/·/g, '<span class="hero__dot">·</span>');
}

function aplicarIdioma(lang) {
  IDIOMA = (lang === 'en') ? 'en' : 'es';
  document.documentElement.lang = IDIOMA;

  // 1. Textos fijos del sitio (contenido/textos.js)
  document.querySelectorAll('[data-txt]').forEach((el) => {
    const par = hayTextos ? TEXTOS[el.dataset.txt] : null;
    if (!par) return;
    const valor = (IDIOMA === 'en') ? textoEN(par) : textoES(par);
    if (el.hasAttribute('data-puntos')) el.innerHTML = conPuntos(valor);
    else el.textContent = valor;
  });

  // 2. Tarjetas generadas, que ya traen su texto en los dos idiomas
  document.querySelectorAll('[data-es]').forEach((el) => {
    el.textContent = (IDIOMA === 'en') ? (el.dataset.en || el.dataset.es) : el.dataset.es;
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === IDIOMA);
  });

  try { localStorage.setItem('antonray-lang', IDIOMA); } catch (e) { /* sin storage, ni modo */ }
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => aplicarIdioma(btn.dataset.lang));
  });

  let guardado = 'es';
  try { guardado = localStorage.getItem('antonray-lang') || 'es'; } catch (e) { /* sin storage, ni modo */ }
  aplicarIdioma(guardado);

});
