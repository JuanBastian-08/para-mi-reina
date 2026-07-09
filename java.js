
    /*
    ================================================================
    SECCIÓN 1: EL MENSAJE DEL DÍA
    ================================================================

    ⚠️  ATENCIÓN: AQUÍ DEBES CAMBIAR EL TEXTO CADA DÍA ⚠️
    ================================================================

    Solo modifica el texto entre las comillas de backtick (` `).
    Puedes usar:
      - Saltos de línea directos (Enter dentro del backtick)
      - \n para un salto de línea
      - Emojis 🌻

    Las comillas de backtick ` ` son "template literals" en JS:
    permiten escribir texto en varias líneas sin trucos especiales.

    ================================================================
    ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    */

    const MENSAJE_DEL_DIA = `Aunque hoy estemos lejos, cada día falta menos para nuestro abrazo .

Que tengas un hermoso día. 🌻`;

    /*
    ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    ================================================================
    FIN DE LA ZONA DE EDICIÓN DIARIA
    ================================================================
    */


    /*
    ================================================================
    SECCIÓN 2: MOSTRAR LA FECHA AUTOMÁTICA
    ================================================================

    Explicación paso a paso:

    1. `new Date()` crea un objeto con la fecha y hora ACTUAL
       del dispositivo del usuario.

    2. `Intl.DateTimeFormat` es una herramienta del navegador para
       formatear fechas según el idioma. Le pasamos:
       - "es-CO" → español de Colombia
       - { weekday, year, month, day } → qué partes mostrar
         "long" significa el nombre completo ("viernes", "junio")

    3. `.format(hoy)` convierte el objeto Date en un texto legible.
       Resultado: "viernes, 27 de junio de 2025"

    4. `.replace(/(^\w)/, c => c.toUpperCase())` hace que la primera
       letra sea mayúscula (Intl a veces la devuelve en minúscula).

    5. `document.getElementById("fecha")` busca el elemento HTML
       con id="fecha". `.textContent = ...` escribe el texto adentro.
    ================================================================
    */

    function mostrarFecha() {
      // Paso 1: Obtenemos la fecha actual del dispositivo
      const hoy = new Date();

      // Paso 2: Configuramos el formateador en español colombiano
      const formateador = new Intl.DateTimeFormat("es-CO", {
        weekday: "long",   // "viernes"
        day:     "numeric", // "27"
        month:   "long",   // "de junio"
        year:    "numeric" // "de 2025"
      });

      // Paso 3: Convertimos la fecha a texto legible
      let textoFecha = formateador.format(hoy);

      // Paso 4: Primera letra en mayúscula
      // (En algunos navegadores "viernes" puede venir en minúsculas)
      textoFecha = textoFecha.charAt(0).toUpperCase() + textoFecha.slice(1);

      // Paso 5: Escribimos el texto en el elemento HTML con id="fecha"
      document.getElementById("fecha").textContent = textoFecha;
    }


    /*
    ================================================================
    SECCIÓN 3: LÓGICA DEL BOTÓN — EVENTOS Y MANIPULACIÓN DEL DOM
    ================================================================

    Conceptos clave que vas a aprender aquí:

    🔹 getElementById(id)
       Busca un elemento en el HTML por su atributo id="..."
       Retorna una referencia al elemento (como un puntero).

    🔹 addEventListener(evento, función)
       Le "escucha" a un elemento esperando un evento específico.
       Cuando ocurre ese evento, ejecuta la función que le pasamos.
       El evento "click" se dispara cuando el usuario hace clic.

    🔹 classList.add(clase)
       Agrega una clase CSS al elemento. Útil para activar estilos
       definidos en CSS sin cambiar el CSS desde JS.

    🔹 classList.remove(clase)
       Quita una clase CSS del elemento.

    🔹 style.display
       Controla directamente la propiedad CSS "display" del elemento.
       "none" = oculto; "" (vacío) = vuelve al valor original del CSS.

    🔹 setAttribute(atributo, valor)
       Cambia un atributo HTML del elemento.
       Aquí lo usamos para actualizar aria-expanded (accesibilidad).
    ================================================================
    */

    function configurarBoton() {

      // Buscamos los elementos que vamos a manipular
      const boton      = document.getElementById("btn-abrir");
      const contenedor = document.getElementById("contenedor-mensaje");
      const parrafo    = document.getElementById("mensaje-texto");

      // Escribimos el mensaje del día en el párrafo (todavía invisible)
      parrafo.textContent = MENSAJE_DEL_DIA;

      /*
        addEventListener("click", función):
        Le decimos al botón: "cuando alguien haga clic en ti,
        ejecuta esta función".

        La función anónima (arrow function =>  ) se crea aquí mismo
        y solo existe para este propósito.
      */
      boton.addEventListener("click", function () {

        /*
          PASO A: Mostramos el contenedor del mensaje.
          Agregamos la clase "visible" que en el CSS cambia
          opacity de 0 → 1 y max-height de 0 → 500px.
          CSS hace la animación de transición automáticamente.
        */
        contenedor.classList.add("visible");

        /*
          PASO B: Ocultamos el botón después de un pequeño retraso.
          setTimeout(función, milisegundos) ejecuta la función
          después de esperar X milisegundos.

          300ms = 0.3 segundos. Esperamos un poco para que la
          animación de aparición del mensaje haya comenzado,
          haciendo que la transición sea más elegante.
        */
        setTimeout(function () {
          boton.style.display = "none";
        }, 300);

        /*
          PASO C: Actualizamos el atributo de accesibilidad.
          aria-expanded="true" le dice a lectores de pantalla
          que el contenido controlado por este botón ahora está visible.
        */
        boton.setAttribute("aria-expanded", "true");
        const musica = document.getElementById('miMusica');
         musica.play();

      }); // fin del addEventListener

    } // fin de configurarBoton()


    /*
    ================================================================
    SECCIÓN 4: INICIALIZACIÓN — Punto de entrada del programa
    ================================================================

    `document.addEventListener("DOMContentLoaded", función)`:

    El navegador carga el HTML de arriba hacia abajo.
    Si el JS intentara buscar elementos con getElementById ANTES
    de que el HTML termine de cargarse, no los encontraría.

    DOMContentLoaded es un evento que se dispara exactamente cuando
    el HTML terminó de parsearse y los elementos ya existen en memoria.
    Es el momento seguro para empezar a trabajar con el DOM.
    ================================================================
    */
    document.addEventListener("DOMContentLoaded", function () {
      mostrarFecha();      // 1. Escribimos la fecha en pantalla
      configurarBoton();   // 2. Activamos la lógica del botón
    });