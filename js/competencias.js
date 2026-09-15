// ============================================================
// COMPETENCIAS TÉCNICAS — tarjetas con sus etiquetas
// (contenido/competencias.js)
// El numerito de cada tarjeta se pone solo según el orden.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.skills__grid');
  if (!grid || !hayCompetencias || !Array.isArray(COMPETENCIAS)) return;

  grid.innerHTML = COMPETENCIAS.map((c, i) => {
    const numero = String(i + 1).padStart(2, '0');
    const tags = (c.tags || [])
      .map((tag) => `<span class="tag" ${attrsIdioma(tag)}>${escapeHTML(textoES(tag))}</span>`)
      .join('');
    return `
      <div class="skill-card">
        <span class="skill-card__index">${numero}</span>
        <h3 ${attrsIdioma(c.titulo)}>${escapeHTML(textoES(c.titulo))}</h3>
        <div class="skill-card__tags">${tags}</div>
      </div>`;
  }).join('');

});
