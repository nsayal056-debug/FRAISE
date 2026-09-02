function cargarTortasPersonalizadas() {

    console.log("TORTAS PERSONALIZADAS JS CARGADO");

    const formulario =
        document.querySelector("#form-torta-personalizada");

    if (!formulario) {
        console.error("No se encontró #form-torta-personalizada");
        return;
    }


    /* =========================================
       ELEMENTOS
    ========================================= */

    const inputFecha =
        document.querySelector("#torta-fecha");

    const relleno1 =
        document.querySelector("#torta-relleno-1");

    const relleno2 =
        document.querySelector("#torta-relleno-2");

    const otro1Container =
        document.querySelector(
            "#torta-relleno-otro-1-container"
        );

    const otro2Container =
        document.querySelector(
            "#torta-relleno-otro-2-container"
        );

    const otro1Input =
        document.querySelector(
            "#torta-relleno-otro-1"
        );

    const otro2Input =
        document.querySelector(
            "#torta-relleno-otro-2"
        );


  /* =========================================
   FECHA MÍNIMA - 72 HORAS
========================================= */

if (inputFecha) {

    const hoy = new Date();

    const fechaMinima = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
    );

    // Sumamos 3 días completos
    fechaMinima.setDate(
        fechaMinima.getDate() + 3
    );

    const anio =
        fechaMinima.getFullYear();

    const mes =
        String(
            fechaMinima.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            fechaMinima.getDate()
        ).padStart(2, "0");

    inputFecha.min =
        `${anio}-${mes}-${dia}`;

}


    /* =========================================
       OTRO RELLENO 1
    ========================================= */

    if (
        relleno1 &&
        otro1Container &&
        otro1Input
    ) {

        relleno1.addEventListener(
            "change",
            () => {

                if (relleno1.value === "Otro") {

                    otro1Container.hidden = false;
                    otro1Input.required = true;

                } else {

                    otro1Container.hidden = true;
                    otro1Input.required = false;
                    otro1Input.value = "";

                }

            }
        );

    }


    /* =========================================
       OTRO RELLENO 2
    ========================================= */

    if (
        relleno2 &&
        otro2Container &&
        otro2Input
    ) {

        relleno2.addEventListener(
            "change",
            () => {

                if (relleno2.value === "Otro") {

                    otro2Container.hidden = false;
                    otro2Input.required = true;

                } else {

                    otro2Container.hidden = true;
                    otro2Input.required = false;
                    otro2Input.value = "";

                }

            }
        );

    }


    /* =========================================
       ENVIAR FORMULARIO
    ========================================= */

    formulario.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            /* =========================================
               VALORES
            ========================================= */

            const fecha =
                document.querySelector(
                    "#torta-fecha"
                ).value;

            const porciones =
                document.querySelector(
                    "#torta-porciones"
                ).value;

            const forma =
                document.querySelector(
                    "#torta-forma"
                ).value;

            const sabor =
                document.querySelector(
                    "#torta-sabor"
                ).value;

            const cobertura =
                document.querySelector(
                    "#torta-cobertura"
                ).value;

            const colores =
                document.querySelector(
                    "#torta-colores"
                ).value.trim();

            const tematica =
                document.querySelector(
                    "#torta-tematica"
                ).value.trim();

            const texto =
                document.querySelector(
                    "#torta-texto"
                ).value.trim();

            const observaciones =
                document.querySelector(
                    "#torta-observaciones"
                ).value.trim();


            /* =========================================
               RELLENOS
            ========================================= */

            let rellenoSeleccionado1 =
                relleno1.value;

            let rellenoSeleccionado2 =
                relleno2.value;


            if (
                rellenoSeleccionado1 === "Otro"
            ) {

                rellenoSeleccionado1 =
                    otro1Input.value.trim();

            }


            if (
                rellenoSeleccionado2 === "Otro"
            ) {

                rellenoSeleccionado2 =
                    otro2Input.value.trim();

            }


            /* =========================================
               DETALLES DEL PEDIDO
            ========================================= */

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


            /* =========================================
               REFERENCIA POR WHATSAPP
            ========================================= */

            detalles.push(
                "📸 Imagen de referencia: adjuntar por WhatsApp"
            );


            /* =========================================
               PRODUCTO PARA EL CARRITO
            ========================================= */

            const productoCarrito = {

                id:
                    `torta-personalizada-${Date.now()}`,

                nombre:
                    "Torta Personalizada",

                foto:
                    "./img/Tortas Personalizadas/tortas-personalizadas-grnl.png",

                cantidadSeleccionada:
                    1,

                variedadesSeleccionadas:
                    detalles,

                precio:
                    null,

                categoria:
                    "tortas-personalizadas"

            };


            /* =========================================
               AGREGAR AL CARRITO
            ========================================= */

            if (
                typeof agregarAlCarrito ===
                "function"
            ) {

                agregarAlCarrito(
                    productoCarrito
                );


                /* =========================================
                   LIMPIAR FORMULARIO
                ========================================= */

                formulario.reset();


                if (otro1Container) {
                    otro1Container.hidden = true;
                }

                if (otro2Container) {
                    otro2Container.hidden = true;
                }

                if (otro1Input) {
                    otro1Input.required = false;
                }

                if (otro2Input) {
                    otro2Input.required = false;
                }


            } else {

                console.error(
                    "La función agregarAlCarrito no existe."
                );

            }

        }
    );

}