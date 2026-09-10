// ============================================================
// ANTON RAY — PORTFOLIO
// Nav scroll state + scroll-reveal animations
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav background on scroll ---
  const nav = document.querySelector('.hud-nav');
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Datos: todo el contenido (textos ES/EN, videos, tarjetas de trabajo,
  // productos) vive en i18n.js / videos.js / work.js / products.js —
  // agregar o editar algo ahí nunca requiere tocar este archivo.
  const hasI18n = typeof I18N !== 'undefined';
  const hasVideos = typeof VIDEOS !== 'undefined';
  const hasWork = typeof WORK !== 'undefined';
  const hasProducts = typeof PRODUCTS !== 'undefined';
  if (!hasI18n) console.warn('i18n.js no se cargó — revisa que esté antes de script.js en index.html');
  if (!hasVideos) console.warn('videos.js no se cargó — revisa que esté antes de script.js en index.html');
  if (!hasWork) console.warn('work.js no se cargó — revisa que esté antes de script.js en index.html');
  if (!hasProducts) console.warn('products.js no se cargó — revisa que esté antes de script.js en index.html');

  // Escapa texto para meterlo seguro dentro de HTML/atributos (se usa en
  // todas las secciones de abajo que arman tarjetas desde los .js de datos).
  const escapeHTML = (str) => String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const escapeAttr = (str) => escapeHTML(str).replace(/"/g, '&quot;');

  // ------------------------------------------------------------
  // SECCIÓN: REEL MODAL
  // ------------------------------------------------------------ — "Ver Reel" (hero) y "Rigging" (menú Reels) abren el demo
  // reel en una ventana sobrepuesta en vez de bajar hasta la sección #reel.
  // Mismo truco de mute+autoplay que los shorts, para que funcione parejo
  // en iOS desde el primer tap.
  const reelModal = document.getElementById('reel-modal');
  const reelModalVideo = document.getElementById('reel-modal-video');
  const reelModalClose = document.getElementById('reel-modal-close');
  const reelModalBackdrop = document.getElementById('reel-modal-backdrop');

  function openReelModal(videoId) {
    // Sin id explícito, cae al reel principal — así los links de "Ver Reel"
    // siguen funcionando igual que antes de que esto aceptara un parámetro.
    const id = videoId || (hasVideos && VIDEOS.reel && VIDEOS.reel.id);
    if (!reelModal || !reelModalVideo || !id) return;
    reelModalVideo.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&playsinline=1`;
    iframe.title = 'Anton Ray — Demo Reel';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    reelModalVideo.appendChild(iframe);
    reelModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeReelModal() {
    if (reelModalVideo) reelModalVideo.innerHTML = '';
    reelModal?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.open-reel-modal').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openReelModal();
      closeMobileNav();
    });
  });

  reelModalClose?.addEventListener('click', closeReelModal);
  reelModalBackdrop?.addEventListener('click', closeReelModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reelModal?.classList.contains('is-open')) closeReelModal();
  });

  // ------------------------------------------------------------
  // SECCIÓN: MINI-REEL POR PESTAÑA
  // ------------------------------------------------------------
  // Reel opcional por pestaña dentro de la sección Reels
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

  // ------------------------------------------------------------
  // SECCIÓN: TARJETAS DE TRABAJO (work.js -> WORK)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // SECCIÓN: BREAKDOWNS (videos.js -> VIDEOS.breakdowns)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // SECCIÓN: TIRA DE SHORTS (tarjetas)
  // ------------------------------------------------------------
  // Tarjetas de la tira de shorts (dobladas para el loop infinito)
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

  // ------------------------------------------------------------
  // SECCIÓN: TIENDA / GUMROAD (products.js -> PRODUCTS)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // SECCIÓN: NAV MÓVIL (hamburguesa)
  // ------------------------------------------------------------
  const navToggle = document.getElementById('hud-nav-toggle');
  const navLinks = document.getElementById('hud-nav-links');

  function closeMobileNav() {
    navLinks?.classList.remove('is-open');
    navToggle?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', !!isOpen);
    navToggle.setAttribute('aria-expanded', String(!!isOpen));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMobileNav();
  });

  // ------------------------------------------------------------
  // SECCIÓN: SCROLL-REVEAL (labels + timeline)
  // ------------------------------------------------------------
  const revealTargets = document.querySelectorAll('.section-label, .timeline__item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // ------------------------------------------------------------
  // SECCIÓN: TABS DE REELS
  // ------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function activateTab(tabName) {
    const targetId = 'panel-' + tabName;

    tabButtons.forEach((b) => {
      const isTarget = b.dataset.tab === tabName;
      b.classList.toggle('is-active', isTarget);
      b.setAttribute('aria-selected', String(isTarget));
    });

    tabPanels.forEach((panel) => {
      const isTarget = panel.id === targetId;
      panel.classList.toggle('is-active', isTarget);
      panel.hidden = !isTarget;
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // ------------------------------------------------------------
  // SECCIÓN: IDIOMA (ES / EN)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // SECCIÓN: SALTAR A UNA PESTAÑA DE REELS (menú + botones del hero)
  // ------------------------------------------------------------
  // "Rigging" in the nav dropdown opens the demo reel modal instead (it's a
  // plain #reel link with no data-tab), so it falls through to the generic
  // smooth-scroll handler below instead of being caught here.
  document.querySelectorAll('a[data-tab]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(link.dataset.tab);
      const target = document.querySelector('#reels');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileNav();
    });
  });

  // ------------------------------------------------------------
  // SECCIÓN: TIRA DE SHORTS (auto-scroll, drag, flechas, reproductor)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // SECCIÓN: SMOOTH-SCROLL para links internos (#ancla)
  // ------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    if (link.classList.contains('open-reel-modal')) return; // handled by the reel modal
    if (link.closest('.nav-dropdown__menu') && link.dataset.tab) return; // handled above
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMobileNav();
    });
  });

});
