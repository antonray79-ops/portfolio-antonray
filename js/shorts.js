// ============================================================
// SHORTS — tarjetas de la tira (videos.js -> VIDEOS.shorts),
// auto-scroll, drag-to-scroll, flechas, loop infinito, y el
// reproductor destacado que abre arriba de la tira.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Tarjetas (dobladas para el loop infinito) ----
  const shortsTrackEl = document.getElementById('shorts-track');
  if (shortsTrackEl && hasVideos && Array.isArray(VIDEOS.shorts)) {
    const ids = VIDEOS.shorts.filter(Boolean);

    const cardHTML = (id, isDuplicate) => `
      <button class="shorts__card" type="button" data-video-id="${id}"${isDuplicate ? ' aria-hidden="true" tabindex="-1"' : ''}>
        <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${isDuplicate ? '' : 'Anton Ray — Short'}" loading="lazy">
        <span class="shorts__card-play">▶</span>
      </button>`;

    shortsTrackEl.innerHTML =
      ids.map((id) => cardHTML(id, false)).join('') +
      ids.map((id) => cardHTML(id, true)).join('');
  }

  // ---- Auto-scroll, drag-to-scroll, flechas, reproductor ----
  const marquee = document.querySelector('.shorts__marquee');
  const track = document.querySelector('.shorts__track');

  if (marquee && track) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let autoPaused = false;
    let resumeTimer = null;
    let isPointerDown = false;
    let wasDragging = false;
    let startX = 0;
    let startScroll = 0;
    let isPlayerOpen = false;

    function half() {
      return track.scrollWidth / 2;
    }

    function wrapScroll() {
      const h = half();
      if (h <= 0) return;
      if (marquee.scrollLeft >= h) marquee.scrollLeft -= h;
      else if (marquee.scrollLeft < 0) marquee.scrollLeft += h;
    }

    function pauseAutoTemporarily() {
      autoPaused = true;
      clearTimeout(resumeTimer);
      // Never auto-resume while the featured player is open — the strip
      // stays fully stopped until the viewer closes the video.
      resumeTimer = setTimeout(() => { if (!isPlayerOpen) autoPaused = false; }, 2200);
    }

    // Auto-scroll loop
    if (!prefersReducedMotion) {
      let lastTs = null;
      const pxPerSecond = 26;
      function tick(ts) {
        if (lastTs === null) lastTs = ts;
        const dt = (ts - lastTs) / 1000;
        lastTs = ts;
        if (!autoPaused && !isPointerDown && !isPlayerOpen) {
          marquee.scrollLeft += pxPerSecond * dt;
          wrapScroll();
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    marquee.addEventListener('mouseenter', () => { autoPaused = true; });
    marquee.addEventListener('mouseleave', () => {
      if (!isPointerDown && !isPlayerOpen) autoPaused = false;
    });
    marquee.addEventListener('wheel', pauseAutoTemporarily, { passive: true });
    marquee.addEventListener('scroll', wrapScroll, { passive: true });

    // Drag-to-scroll — plain mouse events, no pointer capture (capture can
    // swallow the click on the button underneath in some browsers, which
    // was blocking the "play" click entirely).
    marquee.addEventListener('mousedown', (e) => {
      isPointerDown = true;
      startX = e.clientX;
      startScroll = marquee.scrollLeft;
      marquee.classList.add('is-grabbing');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPointerDown) return;
      const delta = e.clientX - startX;
      marquee.scrollLeft = startScroll - delta;
    });

    function endDrag() {
      if (!isPointerDown) return;
      isPointerDown = false;
      marquee.classList.remove('is-grabbing');
      // Only treat it as a drag (and suppress the click) if the strip actually
      // moved a meaningful amount — a plain click can jitter a couple of
      // pixels and shouldn't cancel playing the short.
      const dragDistance = Math.abs(marquee.scrollLeft - startScroll);
      wasDragging = dragDistance > 8;
      pauseAutoTemporarily();
    }
    window.addEventListener('mouseup', endDrag);

    // Touch devices already get native horizontal scrolling for free
    // (overflow-x: auto), so touch just needs the same drag-distance check
    // to avoid a swipe-to-scroll accidentally triggering playback.
    marquee.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      isPointerDown = true;
      startX = t.clientX;
      startScroll = marquee.scrollLeft;
    }, { passive: true });
    marquee.addEventListener('touchmove', () => {
      // native scrolling handles the movement; endDrag() below still runs
      // on touchend and measures scrollLeft to decide wasDragging.
    }, { passive: true });
    marquee.addEventListener('touchend', endDrag);

    // Arrow buttons
    const step = 168; // card width (150) + gap (18)
    document.querySelector('.shorts__nav--prev')?.addEventListener('click', () => {
      pauseAutoTemporarily();
      marquee.scrollBy({ left: -step, behavior: 'smooth' });
    });
    document.querySelector('.shorts__nav--next')?.addEventListener('click', () => {
      pauseAutoTemporarily();
      marquee.scrollBy({ left: step, behavior: 'smooth' });
    });

    // Featured player panel: opens above the strip (like a tab) instead of
    // growing a thumbnail in place — always centered, never clipped.
    const shortsPlayer = document.getElementById('shorts-player');
    const shortsPlayerFrame = shortsPlayer?.querySelector('.shorts__player-frame');
    const shortsPlayerClose = document.getElementById('shorts-player-close');
    let activeCard = null;

    function openPlayer(card) {
      if (!shortsPlayer || !shortsPlayerFrame) return;

      const videoId = card.dataset.videoId;
      shortsPlayerFrame.querySelector('iframe')?.remove();

      const iframe = document.createElement('iframe');
      // muted + autoplay: iOS Safari refuses unmuted autoplay even from a
      // real tap, which made the first tap "open" the player without
      // actually starting it. Muted autoplay is allowed everywhere, and
      // the viewer can unmute from the player's own speaker icon.
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1`;
      iframe.title = 'Anton Ray — Short';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      shortsPlayerFrame.appendChild(iframe);
      shortsPlayer.classList.add('is-open');

      if (activeCard) activeCard.classList.remove('is-active');
      card.classList.add('is-active');
      activeCard = card;

      clearTimeout(resumeTimer);
      autoPaused = true;
      isPlayerOpen = true;

      shortsPlayer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closePlayer() {
      shortsPlayerFrame?.querySelector('iframe')?.remove();
      shortsPlayer?.classList.remove('is-open');
      if (activeCard) activeCard.classList.remove('is-active');
      activeCard = null;
      isPlayerOpen = false;
      autoPaused = false;
    }

    shortsPlayerClose?.addEventListener('click', closePlayer);

    document.querySelectorAll('.shorts__card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (wasDragging) {
          e.preventDefault();
          e.stopPropagation();
          wasDragging = false;
          return;
        }
        openPlayer(card);
      });
    });
  }

});
