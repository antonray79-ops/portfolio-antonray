// ============================================================
// TIENDA — tarjetas de productos Gumroad (products.js -> PRODUCTS)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // Tarjetas de la pestaña Gumroad, con botón "Comprar" real cuando la
  // liga ya está puesta en products.js
  const gumroadGrid = document.getElementById('gumroad-grid');
  if (gumroadGrid && hasProducts && Array.isArray(PRODUCTS.stores?.gumroad)) {
    gumroadGrid.innerHTML = PRODUCTS.stores.gumroad.map((p) => {
      // Con id + url puestos, mostramos la vista previa real de Gumroad
      // (miniatura, precio, botón "I want this!") en vez de una tarjeta
      // hecha a mano — gumroad-embed.js la arma sola al cargar la página.
      if (p.id && p.url) {
        return `
          <div class="gumroad-card gumroad-embed-wrap">
            <div class="gumroad-product-embed" data-gumroad-product-id="${p.id}">
              <a href="${p.url}">Loading...</a>
            </div>
          </div>`;
      }
      // Sin id/url todavía: tarjeta de texto simple como respaldo.
      return `
        <div class="gumroad-card work-card">
          <div class="work-card__thumb">GR</div>
          <h3>${p.title}</h3>
          <p class="i18n" data-en="${escapeAttr(p.descEn)}">${p.desc || ''}</p>
        </div>`;
    }).join('');
  }

  // Flechas de la tira de Gumroad (misma idea que las de la tira de shorts)
  document.getElementById('gumroad-nav-prev')?.addEventListener('click', () => {
    gumroadGrid?.scrollBy({ left: -300, behavior: 'smooth' });
  });
  document.getElementById('gumroad-nav-next')?.addEventListener('click', () => {
    gumroadGrid?.scrollBy({ left: 300, behavior: 'smooth' });
  });

});
