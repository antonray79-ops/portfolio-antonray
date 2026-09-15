// ============================================================
// EXPERIENCIA Y EDUCACIÓN — línea de tiempo y tarjetas de
// estudios (contenido/experiencia.js)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  if (!hayExperiencia) return;

  // ---- Línea de tiempo de trabajos ----
  const timeline = document.querySelector('.timeline');
  if (timeline && Array.isArray(EXPERIENCIA.trabajos)) {
    timeline.innerHTML = EXPERIENCIA.trabajos.map((t) => `
      <article class="timeline__item">
        <div class="timeline__marker"></div>
        <div class="timeline__card">
          <div class="timeline__card-header">
            <h3 ${attrsIdioma(t.empresa)}>${escapeHTML(textoES(t.empresa))}</h3>
            <span class="timeline__date" ${attrsIdioma(t.fechas)}>${escapeHTML(textoES(t.fechas))}</span>
          </div>
          <p class="timeline__role" ${attrsIdioma(t.puesto)}>${escapeHTML(textoES(t.puesto))}</p>
          <p class="timeline__desc" ${attrsIdioma(t.desc)}>${escapeHTML(textoES(t.desc))}</p>
        </div>
      </article>`).join('');
  }

  // ---- Tarjetas de educación ----
  const eduGrid = document.querySelector('.education__grid');
  if (eduGrid && Array.isArray(EXPERIENCIA.educacion)) {
    eduGrid.innerHTML = EXPERIENCIA.educacion.map((e) => `
      <div class="edu-card">
        <span class="edu-card__tag">${escapeHTML(e.etiqueta || '')}</span>
        <h3 ${attrsIdioma(e.titulo)}>${escapeHTML(textoES(e.titulo))}</h3>
        ${textoES(e.escuela) ? `<p ${attrsIdioma(e.escuela)}>${escapeHTML(textoES(e.escuela))}</p>` : ''}
      </div>`).join('');
  }

});
