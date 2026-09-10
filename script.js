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
