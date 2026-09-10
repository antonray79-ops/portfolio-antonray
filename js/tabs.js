// ============================================================
// TABS DE REELS — activar Rigging/Scripting/Motion Capture, y
// saltar a una pestaña desde el menú Reels o los botones del hero.
// activateTab() queda top-level porque "saltar a pestaña" (abajo,
// en este mismo archivo) también la usa.
// ============================================================

function activateTab(tabName) {
  const targetId = 'panel-' + tabName;

  document.querySelectorAll('.tab-btn').forEach((b) => {
    const isTarget = b.dataset.tab === tabName;
    b.classList.toggle('is-active', isTarget);
    b.setAttribute('aria-selected', String(isTarget));
  });

  document.querySelectorAll('.tab-panel').forEach((panel) => {
    const isTarget = panel.id === targetId;
    panel.classList.toggle('is-active', isTarget);
    panel.hidden = !isTarget;
  });
}

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // "Rigging" en el menú Reels abre el modal del demo en vez de esto (es un
  // link #reel simple, sin data-tab), así que cae al smooth-scroll genérico
  // en vez de ser atrapado aquí.
  document.querySelectorAll('a[data-tab]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(link.dataset.tab);
      const target = document.querySelector('#reels');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileNav();
    });
  });

});
