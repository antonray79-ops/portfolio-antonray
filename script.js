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

  // --- Scroll-reveal for section labels + timeline items ---
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

  // --- Work tabs ---
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

  // --- Language toggle (ES / EN) ---
  const i18nEls = document.querySelectorAll('.i18n');
  const langButtons = document.querySelectorAll('.lang-btn');

  // Capture the original Spanish text once, so we can always switch back.
  i18nEls.forEach((el) => {
    if (!el.dataset.es) el.dataset.es = el.innerHTML;
  });

  function setLanguage(lang) {
    i18nEls.forEach((el) => {
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.es;
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

  // --- Reels dropdown: jump to a specific tab from the nav ---
  document.querySelectorAll('.nav-dropdown__menu a[data-tab]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(link.dataset.tab);
      const target = document.querySelector('#reels');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // --- Shorts strip: auto-scroll, drag-to-scroll, arrows, infinite loop ---
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
      resumeTimer = setTimeout(() => { autoPaused = false; }, 2200);
    }

    // Auto-scroll loop
    if (!prefersReducedMotion) {
      let lastTs = null;
      const pxPerSecond = 26;
      function tick(ts) {
        if (lastTs === null) lastTs = ts;
        const dt = (ts - lastTs) / 1000;
        lastTs = ts;
        if (!autoPaused && !isPointerDown) {
          marquee.scrollLeft += pxPerSecond * dt;
          wrapScroll();
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    marquee.addEventListener('mouseenter', () => { autoPaused = true; });
    marquee.addEventListener('mouseleave', () => {
      if (!isPointerDown) autoPaused = false;
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
    const step = 258; // card width (240) + gap (18)
    document.querySelector('.shorts__nav--prev')?.addEventListener('click', () => {
      pauseAutoTemporarily();
      marquee.scrollBy({ left: -step, behavior: 'smooth' });
    });
    document.querySelector('.shorts__nav--next')?.addEventListener('click', () => {
      pauseAutoTemporarily();
      marquee.scrollBy({ left: step, behavior: 'smooth' });
    });

    // Play a short right inside its own card (no popup, no leaving the page)
    function playInline(card) {
      if (card.classList.contains('is-playing')) return;
      document.querySelectorAll('.shorts__card.is-playing').forEach(stopInline);

      const videoId = card.dataset.videoId;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
      iframe.title = 'Anton Ray — Short';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', '');
      card.appendChild(iframe);
      card.classList.add('is-playing');

      clearTimeout(resumeTimer);
      autoPaused = true; // don't scroll a card away while it's playing
    }

    function stopInline(card) {
      const iframe = card.querySelector('iframe');
      if (iframe) iframe.remove();
      card.classList.remove('is-playing');
      autoPaused = false;
    }

    document.querySelectorAll('.shorts__card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (wasDragging) {
          e.preventDefault();
          e.stopPropagation();
          wasDragging = false;
          return;
        }
        if (e.target.closest('.shorts__card-close')) {
          e.stopPropagation();
          stopInline(card);
          return;
        }
        playInline(card);
      });
    });
  }

  // --- Smooth-scroll for in-page nav links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    if (link.closest('.nav-dropdown__menu')) return; // handled above
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
