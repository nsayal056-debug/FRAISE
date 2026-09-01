function cargarCookiesPersonalizadas() {

    const formulario =
        document.querySelector("#form-cookies-personalizadas");

    const btnRestar =
        document.querySelector("#cookies-personalizadas-restar");

    const btnSumar =
        document.querySelector("#cookies-personalizadas-sumar");

    const cantidadElemento =
        document.querySelector("#cookies-personalizadas-cantidad");

    const inputFecha =
        document.querySelector("#cookies-personalizadas-fecha");


    if (!formulario) {
        console.error(
            "No se encontró #form-cookies-personalizadas"
        );
        return;
    }


    /* =========================================
       CANTIDAD
    ========================================= */

    let cantidad = 12;


    function actualizarCantidad() {

        if (cantidadElemento) {
            cantidadElemento.textContent = cantidad;
        }

        if (btnRestar) {
            btnRestar.disabled = cantidad <= 12;
        }

    }


    if (btnSumar) {

        btnSumar.addEventListener("click", () => {

            cantidad++;

            actualizarCantidad();

        });

    }


    if (btnRestar) {

        btnRestar.addEventListener("click", () => {

            if (cantidad > 12) {

                cantidad--;

                actualizarCantidad();

            }

        });

    }


    actualizarCantidad();


    /* =========================================
       FECHA MÍNIMA - 72 HORAS
    ========================================= */

    if (inputFecha) {

        const fechaMinima = new Date();

        fechaMinima.setHours(
            fechaMinima.getHours() + 72
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
       ENVIAR FORMULARIO
    ========================================= */

    formulario.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const fecha =
                document
                    .querySelector(
                        "#cookies-personalizadas-fecha"
                    )
                    .value;


            const texto =
                document
                    .querySelector(
                        "#cookies-personalizadas-texto"
                    )
                    .value
                    .trim();


            const observaciones =
                document
                    .querySelector(
                        "#cookies-personalizadas-observaciones"
                    )
                    .value
                    .trim();


            /* =========================================
               DETALLES
            ========================================= */

            const detalles = [

                `Fecha del evento: ${fecha}`,

                `Cantidad: ${cantidad} unidades`

            ];


            if (texto) {

                detalles.push(
                    `Texto o nombre: ${texto}`
                );

            }


            if (observaciones) {

                detalles.push(
                    `Observaciones: ${observaciones}`
                );

            }


            detalles.push(
                "📸 Imagen de referencia: adjuntar por WhatsApp"
            );


            /* =========================================
               PRODUCTO PARA EL CARRITO
            ========================================= */

            const productoCarrito = {

                id:
                    `cookies-personalizadas-${Date.now()}`,

                nombre:
                    "Cookies Personalizadas",

                foto:
                    "./img/Cookies Personalizadas/cookies-personalizadas.png",

                cantidadSeleccionada:
                    cantidad,

                variedadesSeleccionadas:
                    detalles,

                precio:
                    null,

                categoria:
                    "cookies-personalizadas"

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


                /* LIMPIAR FORMULARIO */

                formulario.reset();


                /* VOLVER CANTIDAD A 12 */

                cantidad = 12;

                actualizarCantidad();


            } else {

                console.error(
                    "La función agregarAlCarrito no existe."
                );

            }

        }
    );

}