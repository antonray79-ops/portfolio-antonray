// ============================================================
// CLIENTES — tira de videos por marca (videos.js -> VIDEOS.clientes)
// Acepta clips horizontales (spots, 16:9) y verticales (shorts, 9:16)
// mezclados en la misma tira; cada tarjeta lleva un título debajo para
// identificar la marca o lo que se hizo. Mismo lenguaje visual que la
// tira de Shorts (arrastrar + flechas + reproductor que se abre arriba),
// pero sin auto-scroll — aquí son pocos clips curados, no una lista
// larga en loop — y el reproductor cambia de forma según la
// orientación del clip que se abrió.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('clients-track');
  const items = (hasVideos && Array.isArray(VIDEOS.clientes))
    ? VIDEOS.clientes.filter((v) => v && v.id)
    : [];
  if (!track || items.length === 0) return;

  // ---- Tarjetas ----
  track.innerHTML = items.map((item, i) => {
    const orientationClass = item.vertical ? 'clients__card--vertical' : 'clients__card--horizontal';
    const title = item.title || '';
    return `
      <button class="clients__card ${orientationClass}" type="button" data-index="${i}">
        <div class="clients__card-thumb">
          <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${escapeAttr(title)}" loading="lazy">
          <span class="clients__card-play">▶</span>
        </div>
        ${title ? `<span class="clients__card-title">${escapeHTML(title)}</span>` : ''}
      </button>`;
  }).join('');

  // ---- Arrastrar para desplazar + flechas (sin auto-scroll) ----
  const mask = document.querySelector('.clients__track-mask');
  let isPointerDown = false;
  let wasDragging = false;
  let startX = 0;
  let startScroll = 0;

  if (mask) {
    mask.addEventListener('mousedown', (e) => {
      isPointerDown = true;
      startX = e.clientX;
      startScroll = mask.scrollLeft;
      mask.classList.add('is-grabbing');
    });
    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown) return;
      mask.scrollLeft = startScroll - (e.clientX - startX);
    });
    function endDrag() {
      if (!isPointerDown) return;
      isPointerDown = false;
      mask.classList.remove('is-grabbing');
      wasDragging = Math.abs(mask.scrollLeft - startScroll) > 8;
    }
    window.addEventListener('mouseup', endDrag);

    mask.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      isPointerDown = true;
      startX = t.clientX;
      startScroll = mask.scrollLeft;
    }, { passive: true });
    mask.addEventListener('touchend', endDrag);

    const step = 300;
    document.querySelector('.clients__nav--prev')?.addEventListener('click', () => {
      mask.scrollBy({ left: -step, behavior: 'smooth' });
    });
    document.querySelector('.clients__nav--next')?.addEventListener('click', () => {
      mask.scrollBy({ left: step, behavior: 'smooth' });
    });
  }

  // ---- Reproductor destacado (se abre arriba de la tira) ----
  const player = document.getElementById('clients-player');
  const playerFrame = player?.querySelector('.clients__player-frame');
  const playerClose = document.getElementById('clients-player-close');
  let activeCard = null;

  function openPlayer(card, item) {
    if (!player || !playerFrame) return;
    playerFrame.querySelector('iframe')?.remove();
    playerFrame.classList.toggle('is-vertical', !!item.vertical);

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
    iframe.title = `Anton Ray — ${item.title || 'Cliente'}`;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    playerFrame.appendChild(iframe);
    player.classList.add('is-open');

    if (activeCard) activeCard.classList.remove('is-active');
    card.classList.add('is-active');
    activeCard = card;

    player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function closePlayer() {
    playerFrame?.querySelector('iframe')?.remove();
    player?.classList.remove('is-open');
    if (activeCard) activeCard.classList.remove('is-active');
    activeCard = null;
  }

  playerClose?.addEventListener('click', closePlayer);

  track.querySelectorAll('.clients__card').forEach((card) => {
    card.addEventListener('click', () => {
      if (wasDragging) { wasDragging = false; return; }
      const item = items[Number(card.dataset.index)];
      if (item) openPlayer(card, item);
    });
  });

});
