const variedadesCookiesNY = [
    "Clásica",
    "Doble Chocolate",
    "Rocklets",
    "Oreo",
    "Kinder",
    "Nutella",
    "Limón"
];

let seleccionCookiesNY = {};


/* =========================
   CARGAR COOKIES NY
========================= */

function cargarCookiesNY() {

    const lista = document.querySelector("#cookies-ny-lista");

    if (!lista) {
        console.error("No se encontró #cookies-ny-lista");
        return;
    }

    seleccionCookiesNY = {};
    lista.innerHTML = "";

    variedadesCookiesNY.forEach((variedad, index) => {

        seleccionCookiesNY[index] = 0;

        const fila = document.createElement("div");

        fila.classList.add("cookies-ny-variedad");

        fila.innerHTML = `

            <span class="cookies-ny-variedad-nombre">
                ${variedad}
            </span>

            <div class="cookies-ny-contador">

                <button
                    type="button"
                    class="cookies-ny-btn cookies-ny-restar"
                    data-index="${index}"
                >
                    −
                </button>

                <span
                    id="cookies-ny-cantidad-${index}"
                    class="cookies-ny-cantidad"
                >
                    0
                </span>

                <button
                    type="button"
                    class="cookies-ny-btn cookies-ny-sumar"
                    data-index="${index}"
                >
                    +
                </button>

            </div>

        `;

        lista.appendChild(fila);
    });

    activarContadoresCookiesNY();
    activarAgregarCookiesNY();
    actualizarTotalCookiesNY();
}


/* =========================
   CONTADORES
========================= */

function activarContadoresCookiesNY() {

    const botonesSumar =
        document.querySelectorAll(".cookies-ny-sumar");

    const botonesRestar =
        document.querySelectorAll(".cookies-ny-restar");


    botonesSumar.forEach((boton) => {

        boton.addEventListener("click", () => {

            const index = Number(boton.dataset.index);

            seleccionCookiesNY[index]++;

            actualizarCantidadCookieNY(index);
        });

    });


    botonesRestar.forEach((boton) => {

        boton.addEventListener("click", () => {

            const index = Number(boton.dataset.index);

            if (seleccionCookiesNY[index] > 0) {
                seleccionCookiesNY[index]--;
            }

            actualizarCantidadCookieNY(index);
        });

    });

}


/* =========================
   ACTUALIZAR CANTIDAD
========================= */

function actualizarCantidadCookieNY(index) {

    const cantidadElemento =
        document.querySelector(
            `#cookies-ny-cantidad-${index}`
        );

    if (cantidadElemento) {
        cantidadElemento.textContent =
            seleccionCookiesNY[index];
    }

    actualizarTotalCookiesNY();
}


/* =========================
   TOTAL
========================= */

function actualizarTotalCookiesNY() {

    const total =
        Object.values(seleccionCookiesNY).reduce(
            (acumulador, cantidad) =>
                acumulador + cantidad,
            0
        );

    const totalElemento =
        document.querySelector("#cookies-ny-total");

    if (totalElemento) {
        totalElemento.textContent = total;
    }

    const botonAgregar =
        document.querySelector(
            "#btn-agregar-cookies-ny"
        );

    if (botonAgregar) {
        botonAgregar.disabled = total < 6;
    }
}


/* =========================
   AGREGAR AL CARRITO
========================= */

function activarAgregarCookiesNY() {

    const boton =
        document.querySelector(
            "#btn-agregar-cookies-ny"
        );

    if (!boton) return;


    boton.addEventListener("click", () => {

        const total =
            Object.values(seleccionCookiesNY).reduce(
                (acumulador, cantidad) =>
                    acumulador + cantidad,
                0
            );


        if (total < 6) {

            alert(
                "Elegí al menos 6 Cookies NY."
            );

            return;
        }


        const variedadesSeleccionadas =
            variedadesCookiesNY
                .map((nombre, index) => ({
                    nombre,
                    cantidad:
                        seleccionCookiesNY[index]
                }))
                .filter(
                    variedad =>
                        variedad.cantidad > 0
                );


        const productoCarrito = {

            id:
                `cookies-ny-${Date.now()}`,

            nombre:
                "Cookies NY",

            foto:
                "./img/Cookies/cookies-ny-seleccion.png",

            cantidadSeleccionada:
                total,

            variedadesSeleccionadas:
                variedadesSeleccionadas.map(
                    variedad =>
                        `${variedad.nombre} x${variedad.cantidad}`
                ),

            precio:
                null,

            categoria:
                "cookies-ny"
        };


        if (
            typeof agregarAlCarrito ===
            "function"
        ) {

            agregarAlCarrito(
                productoCarrito
            );

        } else {

            console.error(
                "La función agregarAlCarrito no existe."
            );
        }

    });

}