function cargarTortasPersonalizadas() {

    const relleno1 = document.querySelector("#torta-relleno-1");
    const relleno2 = document.querySelector("#torta-relleno-2");

    const otro1Container = document.querySelector(
        "#torta-relleno-otro-1-container"
    );

    const otro2Container = document.querySelector(
        "#torta-relleno-otro-2-container"
    );

    const otro1Input = document.querySelector(
        "#torta-relleno-otro-1"
    );

    const otro2Input = document.querySelector(
        "#torta-relleno-otro-2"
    );

    const formulario = document.querySelector(
        "#form-torta-personalizada"
    );


    /* =========================================
       DRAG & DROP
    ========================================= */

    const dropZone =
        document.querySelector("#torta-drop-zone");

    const inputReferencia =
        document.querySelector("#torta-referencia");

    const btnSeleccionar =
        document.querySelector("#btn-seleccionar-referencia");

    const preview =
        document.querySelector("#torta-preview");

    const previewImg =
        document.querySelector("#torta-preview-img");

    const dropContenido =
        document.querySelector("#torta-drop-contenido");

    const btnEliminar =
        document.querySelector("#btn-eliminar-referencia");


    let archivoReferencia = null;


    if (!formulario) {
        console.error(
            "No se encontró #form-torta-personalizada"
        );
        return;
    }

/* =========================================
   FECHA MÍNIMA - 72 HORAS DE ANTICIPACIÓN
========================================= */

const inputFecha = document.querySelector("#torta-fecha");

if (inputFecha) {

    const fechaMinima = new Date();

    fechaMinima.setHours(
        fechaMinima.getHours() + 72
    );

    const anio = fechaMinima.getFullYear();

    const mes = String(
        fechaMinima.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        fechaMinima.getDate()
    ).padStart(2, "0");

    inputFecha.min = `${anio}-${mes}-${dia}`;

}


    /* =========================================
       SELECCIONAR IMAGEN
    ========================================= */

    if (btnSeleccionar && inputReferencia) {

        btnSeleccionar.addEventListener("click", () => {
            inputReferencia.click();
        });

    }


    /* =========================================
       INPUT NORMAL
    ========================================= */

    if (inputReferencia) {

        inputReferencia.addEventListener("change", () => {

            const archivo =
                inputReferencia.files[0];

            if (archivo) {
                mostrarImagenReferencia(archivo);
            }

        });

    }


    /* =========================================
       DRAG & DROP
    ========================================= */

    if (dropZone) {

        dropZone.addEventListener("dragover", (event) => {

            event.preventDefault();

            dropZone.classList.add("drag-activo");

        });


        dropZone.addEventListener("dragleave", () => {

            dropZone.classList.remove("drag-activo");

        });


        dropZone.addEventListener("drop", (event) => {

            event.preventDefault();

            dropZone.classList.remove("drag-activo");

            const archivo =
                event.dataTransfer.files[0];

            if (archivo) {
                mostrarImagenReferencia(archivo);
            }

        });

    }


    /* =========================================
       MOSTRAR PREVIEW
    ========================================= */

    function mostrarImagenReferencia(archivo) {

        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];


        if (!tiposPermitidos.includes(archivo.type)) {

            alert(
                "La imagen debe ser JPG, PNG o WEBP."
            );

            return;
        }


        archivoReferencia = archivo;


        const lector = new FileReader();


        lector.onload = (event) => {

            if (previewImg) {
                previewImg.src = event.target.result;
            }

            if (dropContenido) {
                dropContenido.hidden = true;
            }

            if (preview) {
                preview.hidden = false;
            }

        };


        lector.readAsDataURL(archivo);

    }


    /* =========================================
       ELIMINAR IMAGEN
    ========================================= */

    if (btnEliminar) {

        btnEliminar.addEventListener("click", () => {

            archivoReferencia = null;

            if (inputReferencia) {
                inputReferencia.value = "";
            }

            if (previewImg) {
                previewImg.src = "";
            }

            if (preview) {
                preview.hidden = true;
            }

            if (dropContenido) {
                dropContenido.hidden = false;
            }

        });

    }


    /* =========================
       MOSTRAR "OTRO" RELLENO 1
    ========================= */

    if (relleno1) {

        relleno1.addEventListener("change", () => {

            if (relleno1.value === "Otro") {

                otro1Container.hidden = false;
                otro1Input.required = true;

            } else {

                otro1Container.hidden = true;
                otro1Input.required = false;
                otro1Input.value = "";

            }

        });

    }


    /* =========================
       MOSTRAR "OTRO" RELLENO 2
    ========================= */

    if (relleno2) {

        relleno2.addEventListener("change", () => {

            if (relleno2.value === "Otro") {

                otro2Container.hidden = false;
                otro2Input.required = true;

            } else {

                otro2Container.hidden = true;
                otro2Input.required = false;
                otro2Input.value = "";

            }

        });

    }


    /* =========================
       ENVIAR FORMULARIO
    ========================= */

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();


        const fecha =
            document.querySelector("#torta-fecha").value;

        const porciones =
            document.querySelector("#torta-porciones").value;

        const forma =
            document.querySelector("#torta-forma").value;

        const sabor =
            document.querySelector("#torta-sabor").value;

        const cobertura =
            document.querySelector("#torta-cobertura").value;

        const colores =
            document.querySelector("#torta-colores").value.trim();

        const tematica =
            document.querySelector("#torta-tematica").value.trim();

        const texto =
            document.querySelector("#torta-texto").value.trim();

        const observaciones =
            document.querySelector("#torta-observaciones").value.trim();


        let rellenoSeleccionado1 =
            relleno1.value;

        let rellenoSeleccionado2 =
            relleno2.value;


        if (rellenoSeleccionado1 === "Otro") {

            rellenoSeleccionado1 =
                otro1Input.value.trim();

        }


        if (rellenoSeleccionado2 === "Otro") {

            rellenoSeleccionado2 =
                otro2Input.value.trim();

        }


        const detalles = [

            `Fecha del evento: ${fecha}`,

            `Porciones: ${porciones}`,

            `Forma: ${forma}`,

            `Bizcochuelo: ${sabor}`,

            `Relleno 1: ${rellenoSeleccionado1}`,

            `Relleno 2: ${rellenoSeleccionado2}`,

            `Cobertura: ${cobertura}`

        ];


        if (colores) {

            detalles.push(
                `Colores: ${colores}`
            );

        }


        if (tematica) {

            detalles.push(
                `Temática: ${tematica}`
            );

        }


        if (texto) {

            detalles.push(
                `Texto: ${texto}`
            );

        }


        if (observaciones) {

            detalles.push(
                `Observaciones: ${observaciones}`
            );

        }


      if (archivoReferencia) {

        detalles.push(
            `📸 Imagen de referencia: ${archivoReferencia.name} — Adjuntar imagen por WhatsApp`
    );

}


        const productoCarrito = {

            id:
                `torta-personalizada-${Date.now()}`,

            nombre:
                "Torta Personalizada",

            foto:
                "./img/tortas-personalizadas.png",

            cantidadSeleccionada:
                1,

            variedadesSeleccionadas:
                detalles,

            precio:
                null,

            categoria:
                "tortas-personalizadas"

        };


        if (
            typeof agregarAlCarrito ===
            "function"
        ) {

            agregarAlCarrito(
                productoCarrito
            );


            /* LIMPIAR FORMULARIO */

            formulario.reset();


            /* OCULTAR CAMPOS OTRO */

            otro1Container.hidden = true;
            otro2Container.hidden = true;

            otro1Input.required = false;
            otro2Input.required = false;


            /* LIMPIAR IMAGEN */

            archivoReferencia = null;


            if (inputReferencia) {
                inputReferencia.value = "";
            }


            if (previewImg) {
                previewImg.src = "";
            }


            if (preview) {
                preview.hidden = true;
            }


            if (dropContenido) {
                dropContenido.hidden = false;
            }


        } else {

            console.error(
                "La función agregarAlCarrito no existe."
            );

        }

    });

}