// ============================================================
// REELS — demo de cada pestaña (contenido/videos.js), tarjetas de
// texto (contenido/trabajos.js) y tarjetas de breakdown
// (contenido/videos.js -> VIDEOS.breakdowns)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Demo de arriba, por pestaña ----
  if (hayVideos && VIDEOS.reels) {
    Object.keys(VIDEOS.reels).forEach((pestana) => {
      const videoId = VIDEOS.reels[pestana];
      const contenedor = document.getElementById(`reel-${pestana}`);
      if (!videoId || !contenedor) return;

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0`;
      iframe.title = `Anton Ray — ${pestana}`;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      contenedor.appendChild(iframe);
    });
  }

  // ---- Tarjetas de texto (contenido/trabajos.js) ----
  if (hayTrabajos) {
    Object.keys(TRABAJOS).forEach((pestana) => {
      const grid = document.querySelector(`#panel-${pestana} .work-grid`);
      const items = TRABAJOS[pestana] || [];
      if (!grid) return;

      grid.innerHTML = items.map((item) => `
        <div class="work-card">
          <div class="work-card__thumb">${escapeHTML(item.sigla || '')}</div>
          <h3 ${attrsIdioma(item.titulo)}>${escapeHTML(textoES(item.titulo))}</h3>
          <p ${attrsIdioma(item.desc)}>${escapeHTML(textoES(item.desc))}</p>
        </div>`).join('');
    });
  }

  // ---- Breakdowns (contenido/videos.js) ----
  // Se agregan como tarjetas en la MISMA cuadrícula que las de texto,
  // pero con miniatura. Al darles clic el video se reproduce ARRIBA,
  // en el demo de esa pestaña — nunca en ventana aparte.
  if (hayVideos && VIDEOS.breakdowns) {
    Object.keys(VIDEOS.breakdowns).forEach((pestana) => {
      const items = (VIDEOS.breakdowns[pestana] || []).filter((b) => b && b.id);
      const grid = document.querySelector(`#panel-${pestana} .work-grid`);
      const demo = document.getElementById(`reel-${pestana}`);
      if (!grid || items.length === 0) return;

      items.forEach((item, i) => {
        const titulo = item.titulo || item.title || `Breakdown ${i + 1}`;
        const tarjeta = document.createElement('button');
        tarjeta.type = 'button';
        tarjeta.className = 'work-card work-card--video';
        tarjeta.dataset.videoId = item.id;
        tarjeta.innerHTML = `
          <div class="work-card__video-thumb">
            <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${escapeAttr(textoES(titulo))}" loading="lazy">
            <span class="work-card__play">▶</span>
          </div>
          <h3 ${attrsIdioma(titulo)}>${escapeHTML(textoES(titulo))}</h3>`;

        tarjeta.addEventListener('click', () => {
          if (!demo) return;
          demo.innerHTML = '';
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
          iframe.title = `Anton Ray — ${textoES(titulo)}`;
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
          iframe.setAttribute('allowfullscreen', '');
          demo.appendChild(iframe);

          grid.querySelectorAll('.work-card--video').forEach((c) => c.classList.remove('is-active'));
          tarjeta.classList.add('is-active');
          demo.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        grid.appendChild(tarjeta);
      });
    });
  }

});
