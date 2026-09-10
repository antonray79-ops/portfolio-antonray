// ============================================================
// REELS — mini-reel por pestaña (videos.js), tarjetas de trabajo
// (work.js) y tarjetas de breakdown (videos.js -> VIDEOS.breakdowns)
// dentro de cada pestaña (Rigging / Scripting / Motion Capture)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mini-reel opcional por pestaña ----
  if (hasVideos && VIDEOS.reels) {
    Object.keys(VIDEOS.reels).forEach((tabName) => {
      const videoId = VIDEOS.reels[tabName];
      const container = document.getElementById(`reel-${tabName}`);
      if (!videoId || !container) return;

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0`;
      iframe.title = `Anton Ray — ${tabName}`;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      container.appendChild(iframe);
    });
  }

  // ---- Tarjetas de trabajo (work.js -> WORK) ----
  // "Cascade Rig System", "myTools Compendium", "FaceClean", etc. — el
  // contenido de cada pestaña vive en work.js; aquí solo se arma el HTML.
  if (hasWork) {
    Object.keys(WORK).forEach((tabName) => {
      const grid = document.querySelector(`#panel-${tabName} .work-grid`);
      const items = WORK[tabName] || [];
      if (!grid) return;

      grid.innerHTML = items.map((item) => {
        const titleHTML = item.titleEn
          ? `<h3 class="i18n" data-en="${escapeAttr(item.titleEn)}">${escapeHTML(item.title)}</h3>`
          : `<h3>${escapeHTML(item.title || '')}</h3>`;
        return `
          <div class="work-card">
            <div class="work-card__thumb">${escapeHTML(item.thumb || '')}</div>
            ${titleHTML}
            <p class="i18n" data-en="${escapeAttr(item.descEn || '')}">${item.desc || ''}</p>
          </div>`;
      }).join('');
    });
  }

  // ---- Breakdowns (videos.js -> VIDEOS.breakdowns) ----
  // Se agregan como tarjetas dentro de la MISMA cuadrícula que "Cascade
  // Rig System" etc. (con miniatura en vez de descripción). Al hacerles
  // clic, el video se reproduce ARRIBA, en el mini-reel principal de esa
  // pestaña — nunca en ventana aparte, y el demo principal sigue siendo
  // lo primero que se ve al entrar a la pestaña.
  if (hasVideos && VIDEOS.breakdowns) {
    Object.keys(VIDEOS.breakdowns).forEach((tabName) => {
      const items = (VIDEOS.breakdowns[tabName] || []).filter((b) => b && b.id);
      const grid = document.querySelector(`#panel-${tabName} .work-grid`);
      const miniReel = document.getElementById(`reel-${tabName}`);
      if (!grid || items.length === 0) return;

      items.forEach((item, i) => {
        const label = item.title || `Breakdown ${i + 1}`;
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'work-card work-card--video';
        card.dataset.videoId = item.id;
        card.innerHTML = `
          <div class="work-card__video-thumb">
            <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${escapeAttr(label)}" loading="lazy">
            <span class="work-card__play">▶</span>
          </div>
          <h3>${escapeAttr(label)}</h3>`;

        card.addEventListener('click', () => {
          if (!miniReel) return;
          miniReel.innerHTML = '';
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
          iframe.title = `Anton Ray — ${label}`;
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
          iframe.setAttribute('allowfullscreen', '');
          miniReel.appendChild(iframe);

          grid.querySelectorAll('.work-card--video').forEach((c) => c.classList.remove('is-active'));
          card.classList.add('is-active');
          miniReel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        grid.appendChild(card);
      });
    });
  }

});
