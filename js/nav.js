// ============================================================
// NAV — fondo de la barra al hacer scroll + menú móvil (hamburguesa)
// closeMobileNav() queda top-level (fuera del DOMContentLoaded) porque
// modal.js, tabs.js y smooth-scroll.js también la usan para cerrar el
// menú al navegar.
// ============================================================

function closeMobileNav() {
  const navLinks = document.getElementById('hud-nav-links');
  const navToggle = document.getElementById('hud-nav-toggle');
  navLinks?.classList.remove('is-open');
  navToggle?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

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

  // --- Mobile nav (hamburger) ---
  const navToggle = document.getElementById('hud-nav-toggle');
  const navLinks = document.getElementById('hud-nav-links');

  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', !!isOpen);
    navToggle.setAttribute('aria-expanded', String(!!isOpen));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMobileNav();
  });

});
