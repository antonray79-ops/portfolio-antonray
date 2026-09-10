// ============================================================
// REEL MODAL — ventana sobrepuesta para "Ver Reel" (hero) y
// "Rigging" (menú Reels), en vez de bajar hasta una sección aparte.
// Mismo truco de mute+autoplay que los shorts, para que funcione
// parejo en iOS desde el primer tap.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

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

});
