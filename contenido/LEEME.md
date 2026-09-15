# Carpeta CONTENIDO — todo lo que se edita del sitio está aquí

Esta carpeta es la única que necesitas abrir para cambiar lo que dice y lo que
muestra el sitio. No hace falta tocar `index.html`, ni la carpeta `css/`, ni la
carpeta `js/` — eso es el armazón y el comportamiento, y ya está resuelto.

## Qué archivo cambia qué

| Quiero cambiar... | Abro este archivo |
|---|---|
| Un texto fijo: menú, hero, encabezados, pie de página | `textos.js` |
| El reel principal, los clips de arriba, los demos y breakdowns de Reels | `videos.js` |
| Las tarjetas de texto dentro de las pestañas de Reels | `trabajos.js` |
| Los productos que se venden (Gumroad) | `tienda.js` |
| Los videos de clientes y los nombres de las marcas | `clientes.js` |
| La línea de tiempo de trabajos y los estudios | `experiencia.js` |
| Las tarjetas de competencias técnicas | `competencias.js` |
| Correo, LinkedIn, teléfono y las ligas de YouTube / tienda | `contacto.js` |

Lo único que NO está aquí es el título de la pestaña del navegador y la
descripción que sale en Google: esos dos viven hasta arriba de `index.html`,
marcados con un comentario que dice dónde.

## Las tres reglas para no romper nada

1. **Cambia solo lo que está entre comillas.** Los nombres a la izquierda de
   los dos puntos (`titulo:`, `id:`, `desc:`) son los que el sitio busca —
   si les cambias el nombre, deja de encontrarlos.
2. **Respeta las comas.** Cada renglón de una lista termina en coma. Si copias
   un bloque para agregar otro, revisa que el de arriba siga teniendo la suya.
3. **Si un texto lleva comillas por dentro**, escríbelas con `\"` o usa
   comillas simples por fuera. Ejemplo: `titulo: 'El "Mundial" de Qatar'`.

## Textos en dos idiomas

El sitio tiene botón ES / EN. Cualquier texto que cambie entre idiomas se
escribe así:

```js
titulo: { es: "Simulación & XR", en: "Simulation & XR" }
```

Y si se escribe igual en los dos idiomas (nombres de software, marcas,
nombres propios), basta con ponerlo normal:

```js
titulo: "Motion Capture"
```

Las dos formas funcionan en todos los archivos de esta carpeta.

## Cómo sacar el ID de un video de YouTube

Es el pedazo raro de la liga, no la liga completa:

```
https://youtu.be/hp48qOfm4yo              ->  "hp48qOfm4yo"
https://youtube.com/shorts/XJ4pn3oDILU    ->  "XJ4pn3oDILU"
https://www.youtube.com/watch?v=hp48qOfm4yo  ->  "hp48qOfm4yo"
```

## Después de editar

Guarda el archivo, ábrelo en Git GUI (Rescan → Stage → Commit → Push) y en
uno o dos minutos GitHub Pages publica el cambio. Si algo se ve mal, casi
siempre es una coma o una comilla de más: deshaz el último cambio y vuelve a
intentar con calma.
