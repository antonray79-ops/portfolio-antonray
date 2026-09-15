// ============================================================
// COMPETENCIAS TÉCNICAS — las tarjetas de "Technical Skills"
// ------------------------------------------------------------
// Cada bloque { } es una tarjeta. El numerito (01, 02, 03...) se
// pone solo según el orden de la lista: si agregas una tarjeta en
// medio, los números se reacomodan solos — no los escribas.
//
// Para agregar una tarjeta, copia un bloque completo (desde la
// llave { hasta la llave },) y cámbiale el título y las etiquetas.
// Para agregar un software a una tarjeta que ya existe, solo
// agrega otro renglón entre comillas en su lista de "tags".
//
// El título se escribe { es: "...", en: "..." } si cambia entre
// idiomas, o entre comillas normales si se escribe igual en los
// dos (los nombres de software casi siempre son iguales).
// ============================================================

const COMPETENCIAS = [

  {
    titulo: "Software",
    tags: ["Maya", "Unreal Engine"]
  },

  {
    titulo: "Scripting",
    tags: ["Python", "PySide"]
  },

  {
    titulo: "Motion Capture",
    tags: ["Rokoko", "Vicon", "ARKit"]
  },

  {
    titulo: { es: "Simulación & XR", en: "Simulation & XR" },
    tags: ["Chaos Cloth", "XR", "AR", "VR"]
  }

];
