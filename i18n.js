// ============================================================
// SPACE JOINTS — DICCIONARIO DE TEXTOS (ES / EN)
// ------------------------------------------------------------
// El español vive directo en index.html (es el texto por default
// de cada elemento). Este archivo solo trae la versión en inglés
// de esos mismos textos — lo que se muestra al darle al botón EN.
//
// Para editar una traducción, busca la key (el nombre entre
// comillas) en index.html — el elemento tiene data-i18n="esa-key".
// Para agregar un texto traducible nuevo:
//   1. En index.html, agrégale class="i18n" y data-i18n="mi_key"
//      al elemento (el texto en español que ya tiene se queda igual).
//   2. Aquí abajo agrega:  mi_key: "Texto en inglés",
// ============================================================

const I18N = {
  // ---- Navegación ----------------------------------------
  nav_reels: "Reels",
  nav_rigging: "Rigging",
  nav_mocap: "Motion Capture",
  nav_store: "Store",
  nav_clients: "Clients",
  nav_experience: "Experience",
  nav_skills: "Skills",
  nav_contact: "Contact",

  // ---- Hero ----------------------------------------------
  hero_tagline: "10+ years bringing characters to life across film, TV, games, and virtual production — from the first meeting to the final render.",
  hero_watch_reel: "Watch Reel",
  hero_quicklink_mocap: "Motion Capture",

  // ---- Tira de shorts ------------------------------------
  shorts_more: "More clips on YouTube ↗",

  // ---- Pestañas de Reels ---------------------------------
  tabs_mocap: "Motion Capture",

  // ---- Tienda --------------------------------------------
  store_gumroad_link: "Visit Gumroad store ↗",

  // ---- Clientes ------------------------------------------
  label_clients: "// BRANDS I'VE WORKED WITH",

  // ---- Experiencia ---------------------------------------
  label_experience: "// 01 — PROFESSIONAL EXPERIENCE",
  exp_spacejoints_date: "2016 — Present",
  exp_spacejoints_desc: "My own virtual production studio. Leading VFX, motion capture, and real-time pipeline projects for film, TV, advertising, and live events — including TV Azteca commercials for the Qatar and Mexico 2026 World Cups, the VISA World Cup Mexico campaign, and the full MoCap pipeline for Marinela's virtual character at its live performance at Auditorio Nacional.",
  exp_orionn_desc: "Supervised motion capture and visual effects depending on the project — multidisciplinary work across different productions.",
  exp_lala_role: "Character Rigger",
  exp_lala_desc: "Character rigging for 3D production.",

  // ---- Competencias --------------------------------------
  label_skills: "// 02 — TECHNICAL SKILLS",
  skill_mocap: "Motion Capture",
  skill_sim: "Simulation & XR",

  // ---- Educación -----------------------------------------
  label_education: "// 03 — EDUCATION",
  edu_mba: "Master of Business Administration",

  // ---- Contacto ------------------------------------------
  label_contact: "// 04 — CONTACT",
  contact_headline: "Let's build something together?",
  contact_phone_label: "PHONE",
  contact_phone_value: "Add number",

  // ---- Footer --------------------------------------------
  footer_credit: "Designed and built by Anton Ray",
};
