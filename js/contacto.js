// ============================================================
// CONTACTO — bloques de contacto y las ligas de YouTube y tienda
// (contenido/contacto.js)
// Un dato vacío en contacto.js = ese bloque no aparece.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  if (!hayContacto) return;

  // ---- Bloques de la sección Contacto ----
  const grid = document.querySelector('.contact__grid');
  if (grid) {
    const bloques = [];

    if (CONTACTO.email) {
      bloques.push({
        href: `mailto:${CONTACTO.email}`,
        clave: 'contact_email',
        valor: CONTACTO.email,
        externo: false
      });
    }

    if (CONTACTO.linkedin && CONTACTO.linkedin.url) {
      bloques.push({
        href: CONTACTO.linkedin.url,
        clave: 'contact_linkedin',
        valor: CONTACTO.linkedin.texto || CONTACTO.linkedin.url,
        externo: true
      });
    }

    if (CONTACTO.telefono) {
      bloques.push({
        href: `tel:${String(CONTACTO.telefono).replace(/[^+\d]/g, '')}`,
        clave: 'contact_phone',
        valor: CONTACTO.telefono,
        externo: false
      });
    }

    grid.innerHTML = bloques.map((b) => `
      <a href="${escapeAttr(b.href)}" class="contact-block"${b.externo ? ' target="_blank" rel="noopener"' : ''}>
        <span class="contact-block__label" data-txt="${b.clave}"></span>
        <span class="contact-block__value">${escapeHTML(b.valor)}</span>
      </a>`).join('');
  }

  // ---- Ligas que viven en otras secciones ----
  const ligaYoutube = document.getElementById('liga-youtube');
  if (ligaYoutube && CONTACTO.youtube) ligaYoutube.href = CONTACTO.youtube;

  const ligaTienda = document.getElementById('liga-tienda');
  if (ligaTienda && CONTACTO.tienda) ligaTienda.href = CONTACTO.tienda;

});
