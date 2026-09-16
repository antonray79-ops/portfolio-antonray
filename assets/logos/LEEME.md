# Logos de clientes

Aquí van los logos de las marcas que salen en la sección Clientes. Esta
carpeta arranca vacía a propósito — el sitio funciona sin ella (los cuadritos
muestran el nombre escrito) y va cambiando a logo conforme vas agregando
archivos.

## Cómo agregar un logo

1. Guarda el archivo en esta carpeta, con nombre simple y sin espacios:
   `honda.png`, `tvazteca.svg`, `telcel.png`.
2. Abre `contenido/clientes.js` y agrégale el nombre del archivo a esa marca:

   ```js
   { nombre: "Honda México", logo: "honda.png" },
   ```

   Solo el nombre del archivo, no la ruta completa.

Si el archivo no existe o el nombre está mal escrito, ese cuadrito vuelve a
mostrar el nombre de la marca. No se rompe nada.

## Qué formato conviene

SVG es lo ideal (se ve nítido en cualquier pantalla y pesa poquito). Si no
hay SVG, PNG con **fondo transparente**, de unos 400-600 px de ancho. JPG no
sirve: trae fondo blanco y se va a ver un recuadro feo.

Todos los logos se pintan de blanco automáticamente para que se vean parejos
en el fondo oscuro, sin importar de qué color venga el archivo. Por eso da
igual si bajas la versión negra o la de colores. Si alguna marca la quieres
con sus colores originales, agrégale `color: true` en `contenido/clientes.js`.

## De dónde bajarlos

La forma más rápida es **brandfetch.com/** + el dominio de la marca, que casi
siempre tiene SVG y PNG listos:

- brandfetch.com/honda.com
- brandfetch.com/tvazteca.com.mx
- brandfetch.com/grupobimbo.com
- brandfetch.com/visa.com
- brandfetch.com/garnier.com
- brandfetch.com/cerave.com
- brandfetch.com/maybelline.com
- brandfetch.com/telcel.com
- brandfetch.com/volaris.com

También sirven los centros de marca oficiales (Visa tiene el suyo en
corporate.visa.com/en/about-visa/brand.html, Honda en hondanews.com), o
cualquier archivo que ya tengas de cuando trabajaste con ellos — ese suele
ser el de mejor calidad.

## Una nota práctica

Mostrar logos de clientes para decir con quién has trabajado es lo normal en
un portafolio. Lo que conviene evitar es acomodarlos de forma que parezca que
la marca te patrocina o te avala: el encabezado de la sección ya dice "marcas
con las que he trabajado", que es justo el encuadre correcto.
