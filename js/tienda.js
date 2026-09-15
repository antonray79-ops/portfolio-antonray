// ============================================================
// TIENDA — productos de Gumroad (contenido/tienda.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const tira = document.getElementById('gumroad-grid');
  if (tira && hayTienda && Array.isArray(TIENDA.gumroad)) {
    tira.innerHTML = TIENDA.gumroad.map((p) => {
      // Con id + url puestos se muestra la vista previa real de Gumroad
      // (miniatura, precio y botón de compra) — gumroad-embed.js la arma
      // solo al cargar la página.
      if (p.id && p.url) {
        return `
          <div class="gumroad-card gumroad-embed-wrap">
            <div class="gumroad-product-embed" data-gumroad-product-id="${escapeAttr(p.id)}">
              <a href="${escapeAttr(p.url)}">Loading...</a>
            </div>
          </div>`;
      }
      // Sin id/url todavía: tarjeta de texto simple como respaldo.
      return `
        <div class="gumroad-card work-card">
          <div class="work-card__thumb">GR</div>
          <h3 ${attrsIdioma(p.titulo)}>${escapeHTML(textoES(p.titulo))}</h3>
          <p ${attrsIdioma(p.desc)}>${escapeHTML(textoES(p.desc))}</p>
        </div>`;
    }).join('');
  }

  // Flechas de la tira (misma idea que las de la tira de shorts)
  document.getElementById('gumroad-nav-prev')?.addEventListener('click', () => {
    tira?.scrollBy({ left: -300, behavior: 'smooth' });
  });
  document.getElementById('gumroad-nav-next')?.addEventListener('click', () => {
    tira?.scrollBy({ left: 300, behavior: 'smooth' });
  });

});
