// ============================================================
// SMOOTH-SCROLL — links internos (#ancla) que no maneja ya el modal
// del reel ni el salto a una pestaña de Reels (tabs.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    if (link.classList.contains('open-reel-modal')) return; // handled by modal.js
    if (link.closest('.nav-dropdown__menu') && link.dataset.tab) return; // handled by tabs.js
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
