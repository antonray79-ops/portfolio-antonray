// ============================================================
// TEXTOS DEL SITIO (español / inglés)
// ------------------------------------------------------------
// Aquí vive CADA texto fijo del sitio: el menú de arriba, el hero,
// los encabezados de sección, el pie de página. Si quieres cambiar
// una palabra que se ve en el sitio y no es un video, un trabajo,
// un cliente ni un producto, casi seguro está en este archivo.
//
// Cada texto se escribe así:
//   clave: { es: "lo que se ve en español", en: "what shows in English" }
//
// Si un texto es igual en los dos idiomas, igual escribe los dos
// (es más fácil de leer después que adivinar por qué falta uno).
// No borres las claves ni les cambies el nombre — el sitio las
// busca por ese nombre. Cambia SOLO lo que está entre comillas.
// ============================================================

const TEXTOS = {

  // ---- Menú de arriba ----------------------------------------
  nav_reels:      { es: "Reels",          en: "Reels" },
  nav_rigging:    { es: "Rigging",        en: "Rigging" },
  nav_scripting:  { es: "Scripting",      en: "Scripting" },
  nav_mocap:      { es: "Motion Capture", en: "Motion Capture" },
  nav_store:      { es: "Tienda",         en: "Store" },
  nav_clients:    { es: "Clientes",       en: "Clients" },
  nav_experience: { es: "Experiencia",    en: "Experience" },
  nav_skills:     { es: "Competencias",   en: "Skills" },
  nav_contact:    { es: "Contacto",       en: "Contact" },

  // ---- Hero (la primera pantalla) ----------------------------
  hero_eyebrow: { es: "SPACE JOINTS · CIUDAD DE MÉXICO", en: "SPACE JOINTS · MEXICO CITY" },
  hero_nombre:  { es: "ANTON RAY",        en: "ANTON RAY" },
  hero_alias:   { es: "Antonio Mexicano", en: "Antonio Mexicano" },
  // Los " · " de este renglón salen en ámbar solos — solo escribe el texto.
  hero_puesto:  {
    es: "Creative Producer · VFX Supervisor · Rigging TD",
    en: "Creative Producer · VFX Supervisor · Rigging TD"
  },
  hero_tagline: {
    es: "10+ años dando vida a personajes en cine, TV, videojuegos y virtual production — de la primera junta al render final.",
    en: "10+ years bringing characters to life across film, TV, games, and virtual production — from the first meeting to the final render."
  },
  hero_boton_reel:    { es: "Reel de Rigging", en: "Rigging Reel" },
  hero_boton_spots:   { es: "Reel de Spots",   en: "Commercial Spots Reel" },
  hero_quick_rigging: { es: "Rigging",        en: "Rigging" },
  hero_quick_script:  { es: "Scripting",      en: "Scripting" },
  hero_quick_mocap:   { es: "Motion Capture", en: "Motion Capture" },
  hero_scroll:        { es: "SCROLL",         en: "SCROLL" },

  // ---- Encabezados de cada sección ---------------------------
  // El "// " del principio es parte del estilo del sitio; si lo
  // quitas, el encabezado se ve sin él.
  label_clips:      { es: "// CLIPS",                          en: "// CLIPS" },
  label_reels:      { es: "// REELS",                          en: "// REELS" },
  label_store:      { es: "// TIENDA",                         en: "// STORE" },
  label_clients:    { es: "// MARCAS CON LAS QUE HE TRABAJADO", en: "// BRANDS I'VE WORKED WITH" },
  label_experience: { es: "// EXPERIENCIA PROFESIONAL",        en: "// PROFESSIONAL EXPERIENCE" },
  label_skills:     { es: "// COMPETENCIAS TÉCNICAS",          en: "// TECHNICAL SKILLS" },
  label_education:  { es: "// EDUCACIÓN",                      en: "// EDUCATION" },
  label_contact:    { es: "// CONTACTO",                       en: "// CONTACT" },

  // ---- Pestañas de la sección Reels --------------------------
  tab_rigging:   { es: "Rigging",        en: "Rigging" },
  tab_scripting: { es: "Scripting",      en: "Scripting" },
  tab_mocap:     { es: "Motion Capture", en: "Motion Capture" },

  // ---- Ligas sueltas -----------------------------------------
  shorts_more: { es: "Más clips en YouTube ↗",    en: "More clips on YouTube ↗" },
  store_link:  { es: "Ver tienda en Gumroad ↗",   en: "Visit Gumroad store ↗" },

  // ---- Contacto y pie de página ------------------------------
  contact_headline: { es: "¿Hacemos algo juntos?", en: "Let's build something together?" },
  contact_email:    { es: "EMAIL",                 en: "EMAIL" },
  contact_linkedin: { es: "LINKEDIN",              en: "LINKEDIN" },
  contact_phone:    { es: "TELÉFONO",              en: "PHONE" },
  contact_youtube:  { es: "YOUTUBE",               en: "YOUTUBE" },
  footer_copyright: { es: "SPACE JOINTS © 2026",   en: "SPACE JOINTS © 2026" },
  footer_credit:    { es: "Diseñado y construido por Anton Ray", en: "Designed and built by Anton Ray" },

};
