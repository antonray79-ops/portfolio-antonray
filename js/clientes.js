// ============================================================
// CLIENTES — tira de videos por marca y cuadrícula de marcas
// (contenido/clientes.js)
// ------------------------------------------------------------
// La tira acepta clips horizontales (spots, 16:9) y verticales
// (shorts, 9:16) mezclados; cada tarjeta lleva su título debajo.
// Mismo lenguaje visual que la tira de Shorts (arrastrar +
// flechas + reproductor que se abre arriba), pero sin auto-scroll
// — aquí son pocos clips curados — y el reproductor cambia de
// forma según la orientación del clip que se abrió.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Cuadrícula de marcas ----
  const grid = document.querySelector('.clients__grid');
  if (grid && hayClientes && Array.isArray(CLIENTES.marcas)) {
    grid.innerHTML = CLIENTES.marcas
      .map((marca) => `<div class="client-chip" ${attrsIdioma(marca)}>${escapeHTML(textoES(marca))}</div>`)
      .join('');
  }

  // ---- Tira de videos ----
  const tira = document.getElementById('clients-track');
  const items = (hayClientes && Array.isArray(CLIENTES.videos))
    ? CLIENTES.videos.filter((v) => v && v.id)
    : [];
  if (!tira || items.length === 0) return;

  tira.innerHTML = items.map((item, i) => {
    const orientacion = item.vertical ? 'clients__card--vertical' : 'clients__card--horizontal';
    const titulo = item.titulo || item.title || '';
    return `
      <button class="clients__card ${orientacion}" type="button" data-index="${i}">
        <div class="clients__card-thumb">
          <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${escapeAttr(textoES(titulo))}" loading="lazy">
          <span class="clients__card-play">▶</span>
        </div>
        ${titulo ? `<span class="clients__card-title" ${attrsIdioma(titulo)}>${escapeHTML(textoES(titulo))}</span>` : ''}
      </button>`;
  }).join('');

  // ---- Arrastrar para desplazar + flechas ----
  const mask = document.querySelector('.clients__track-mask');
  let mouseAbajo = false;
  let huboArrastre = false;
  let inicioX = 0;
  let inicioScroll = 0;

  if (mask) {
    mask.addEventListener('mousedown', (e) => {
      mouseAbajo = true;
      inicioX = e.clientX;
      inicioScroll = mask.scrollLeft;
      mask.classList.add('is-grabbing');
    });
    window.addEventListener('mousemove', (e) => {
      if (!mouseAbajo) return;
      mask.scrollLeft = inicioScroll - (e.clientX - inicioX);
    });
    function terminarArrastre() {
      if (!mouseAbajo) return;
      mouseAbajo = false;
      mask.classList.remove('is-grabbing');
      huboArrastre = Math.abs(mask.scrollLeft - inicioScroll) > 8;
    }
    window.addEventListener('mouseup', terminarArrastre);

    mask.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      mouseAbajo = true;
      inicioX = t.clientX;
      inicioScroll = mask.scrollLeft;
    }, { passive: true });
    mask.addEventListener('touchend', terminarArrastre);

    const paso = 300;
    document.querySelector('.clients__nav--prev')?.addEventListener('click', () => {
      mask.scrollBy({ left: -paso, behavior: 'smooth' });
    });
    document.querySelector('.clients__nav--next')?.addEventListener('click', () => {
      mask.scrollBy({ left: paso, behavior: 'smooth' });
    });
  }

  // ---- Reproductor destacado (se abre arriba de la tira) ----
  const player = document.getElementById('clients-player');
  const marco = player?.querySelector('.clients__player-frame');
  const cerrar = document.getElementById('clients-player-close');
  let tarjetaActiva = null;

  function abrirPlayer(tarjeta, item) {
    if (!player || !marco) return;
    marco.querySelector('iframe')?.remove();
    marco.classList.toggle('is-vertical', !!item.vertical);

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
    iframe.title = `Anton Ray — ${textoES(item.titulo || item.title) || 'Cliente'}`;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    marco.appendChild(iframe);
    player.classList.add('is-open');

    if (tarjetaActiva) tarjetaActiva.classList.remove('is-active');
    tarjeta.classList.add('is-active');
    tarjetaActiva = tarjeta;

    player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function cerrarPlayer() {
    marco?.querySelector('iframe')?.remove();
    player?.classList.remove('is-open');
    if (tarjetaActiva) tarjetaActiva.classList.remove('is-active');
    tarjetaActiva = null;
  }

  cerrar?.addEventListener('click', cerrarPlayer);

  tira.querySelectorAll('.clients__card').forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
      if (huboArrastre) { huboArrastre = false; return; }
      const item = items[Number(tarjeta.dataset.index)];
      if (item) abrirPlayer(tarjeta, item);
    });
  });

});
