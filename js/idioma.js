// ============================================================
// IDIOMA (ES / EN) — toggle que lee de i18n.js para el texto
// estático del sitio, y de data-en inline para las tarjetas
// (work.js/videos.js/products.js). Va DESPUÉS de reels.js, shorts.js
// y tienda.js a propósito: necesita que esas tarjetas ya existan en
// el DOM para poder capturar su texto en español.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const i18nEls = document.querySelectorAll('.i18n');
  const langButtons = document.querySelectorAll('.lang-btn');

  // Capture the original Spanish text once, so we can always switch back.
  i18nEls.forEach((el) => {
    if (!el.dataset.es) el.dataset.es = el.innerHTML;
  });

  // Texto en inglés de un elemento .i18n: si trae data-i18n="key" lo busca
  // en el diccionario de i18n.js (texto estático del sitio); si trae
  // data-en="..." directo en el atributo, lo usa tal cual (así es como lo
  // arman work.js/videos.js/products.js para sus propias tarjetas).
  function englishFor(el) {
    const key = el.dataset.i18n;
    if (key) return hasI18n && I18N[key] !== undefined ? I18N[key] : el.dataset.es;
    return el.dataset.en !== undefined ? el.dataset.en : el.dataset.es;
  }

  function setLanguage(lang) {
    i18nEls.forEach((el) => {
      el.innerHTML = lang === 'en' ? englishFor(el) : el.dataset.es;
    });
    langButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
    document.documentElement.lang = lang;
    try { localStorage.setItem('antonray-lang', lang); } catch (e) { /* storage unavailable, ignore */ }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  let savedLang = 'es';
  try { savedLang = localStorage.getItem('antonray-lang') || 'es'; } catch (e) { /* storage unavailable, ignore */ }
  if (savedLang === 'en') setLanguage('en');

});
