// ============================================================
// CLIENTES — tira de videos por marca y cuadrícula de marcas
// (contenido/clientes.js)
// ------------------------------------------------------------
// La tira acepta clips horizontales (spots, 16:9) y verticales
// (shorts, 9:16) mezclados; cada tarjeta lleva su título debajo.
// Los cuadritos de marca muestran el logo si contenido/clientes.js
// trae uno, y si no (o si el archivo no carga) muestran el nombre.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Muro de marcas: desfile continuo ----
  // Se arman DOS mitades idénticas y el CSS recorre exactamente el ancho
  // de una; cuando la animación reinicia, el cuadro es idéntico al
  // anterior, así que el loop no se nota.
  const muro = document.getElementById('clients-logos');
  if (muro && hayClientes && Array.isArray(CLIENTES.marcas)) {

    const marcaHTML = (m) => {
      // Acepta tanto { nombre: "..." } como el formato viejo de solo texto.
      const marca = (m && typeof m === 'object') ? m : { nombre: m };
      const nombre = textoES(marca.nombre);

      if (marca.logo) {
        const clase = marca.color ? 'client-chip__logo client-chip__logo--color' : 'client-chip__logo';
        return `
          <div class="client-chip client-chip--logo">
            <img class="${clase}" src="assets/logos/${escapeAttr(marca.logo)}" alt="${escapeAttr(nombre)}">
          </div>`;
      }

      return `<div class="client-chip" ${attrsIdioma(marca.nombre)}>${escapeHTML(nombre)}</div>`;
    };

    const grupo = CLIENTES.marcas.map(marcaHTML).join('');
    muro.innerHTML = `<div class="clients__logos-track"><div class="clients__logos-half">${grupo}</div></div>`;

    const track = muro.querySelector('.clients__logos-track');
    const mitad = muro.querySelector('.clients__logos-half');

    // Con pocas marcas la tira sería más angosta que la pantalla y se vería
    // el hueco al dar la vuelta: se repite el grupo hasta que sobre ancho.
    const anchoObjetivo = Math.max(muro.clientWidth, window.innerWidth) * 1.5;
    let vueltas = 1;
    while (mitad.scrollWidth < anchoObjetivo && vueltas < 12) {
      mitad.insertAdjacentHTML('beforeend', grupo);
      vueltas++;
    }

    // La segunda mitad es la copia exacta que hace posible el loop.
    const copia = mitad.cloneNode(true);
    copia.setAttribute('aria-hidden', 'true');
    track.appendChild(copia);

    // Velocidad pareja (~55 px por segundo) sin importar cuántas marcas haya.
    track.style.animationDuration = Math.max(20, Math.round(mitad.scrollWidth / 55)) + 's';

    // Si un logo no carga (archivo que no existe o nombre mal escrito), esa
    // marca se cae de vuelta a su nombre escrito en vez de dejar la imagen rota.
    muro.querySelectorAll('.client-chip__logo').forEach((img) => {
      img.addEventListener('error', () => {
        const chip = img.closest('.client-chip');
        if (!chip) return;
        const nombre = img.getAttribute('alt') || '';
        chip.classList.remove('client-chip--logo');
        chip.textContent = nombre;
        console.warn(`No cargó el logo de "${nombre}" (assets/logos/) — se muestra el nombre. Revisa que el archivo exista y que el nombre esté bien escrito en contenido/clientes.js`);
      });
    });
  }

  // ---- Tira de videos ----
  const tira = document.getElementById('clients-track');
  const items = (hayClientes && Array.isArray(CLIENTES.videos))
    ? CLIENTES.videos.filter((v) => v && v.id)
    : [];
  if (!tira || items.length === 0) return;

  tira.innerHTML = items.map((item, i) => {
    const orientacion = item.vertical ? 'clients__card--vertical' : 'clients__card--horizontal';
    const titulo = item.titulo || item.title || '';
    return `
      <button class="clients__card ${orientacion}" type="button" data-index="${i}">
        <div class="clients__card-thumb">
          <img src="https://img.youtube.com/vi/${item.id}/hqdefault.jpg" alt="${escapeAttr(textoES(titulo))}" loading="lazy">
          <span class="clients__card-play">▶</span>
        </div>
        ${titulo ? `<span class="clients__card-title" ${attrsIdioma(titulo)}>${escapeHTML(textoES(titulo))}</span>` : ''}
      </button>`;
  }).join('');

  // ---- Arrastrar para desplazar + flechas ----
  const mask = document.querySelector('.clients__track-mask');
  let mouseAbajo = false;
  let huboArrastre = false;
  let inicioX = 0;
  let inicioScroll = 0;

  if (mask) {
    mask.addEventListener('mousedown', (e) => {
      mouseAbajo = true;
      inicioX = e.clientX;
      inicioScroll = mask.scrollLeft;
      mask.classList.add('is-grabbing');
    });
    window.addEventListener('mousemove', (e) => {
      if (!mouseAbajo) return;
      mask.scrollLeft = inicioScroll - (e.clientX - inicioX);
    });
    function terminarArrastre() {
      if (!mouseAbajo) return;
      mouseAbajo = false;
      mask.classList.remove('is-grabbing');
      huboArrastre = Math.abs(mask.scrollLeft - inicioScroll) > 8;
    }
    window.addEventListener('mouseup', terminarArrastre);

    mask.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      mouseAbajo = true;
      inicioX = t.clientX;
      inicioScroll = mask.scrollLeft;
    }, { passive: true });
    mask.addEventListener('touchend', terminarArrastre);

    const paso = 300;
    document.querySelector('.clients__nav--prev')?.addEventListener('click', () => {
      mask.scrollBy({ left: -paso, behavior: 'smooth' });
    });
    document.querySelector('.clients__nav--next')?.addEventListener('click', () => {
      mask.scrollBy({ left: paso, behavior: 'smooth' });
    });
  }

  // ---- Reproductor destacado (se abre arriba de la tira) ----
  const player = document.getElementById('clients-player');
  const marco = player?.querySelector('.clients__player-frame');
  const cerrar = document.getElementById('clients-player-close');
  let tarjetaActiva = null;

  function abrirPlayer(tarjeta, item) {
    if (!player || !marco) return;
    marco.querySelector('iframe')?.remove();
    marco.classList.toggle('is-vertical', !!item.vertical);

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1&rel=0&playsinline=1`;
    iframe.title = `Anton Ray — ${textoES(item.titulo || item.title) || 'Cliente'}`;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    marco.appendChild(iframe);
    player.classList.add('is-open');

    if (tarjetaActiva) tarjetaActiva.classList.remove('is-active');
    tarjeta.classList.add('is-active');
    tarjetaActiva = tarjeta;

    player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function cerrarPlayer() {
    marco?.querySelector('iframe')?.remove();
    player?.classList.remove('is-open');
    if (tarjetaActiva) tarjetaActiva.classList.remove('is-active');
    tarjetaActiva = null;
  }

  cerrar?.addEventListener('click', cerrarPlayer);

  tira.querySelectorAll('.clients__card').forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
      if (huboArrastre) { huboArrastre = false; return; }
      const item = items[Number(tarjeta.dataset.index)];
      if (item) abrirPlayer(tarjeta, item);
    });
  });

});
