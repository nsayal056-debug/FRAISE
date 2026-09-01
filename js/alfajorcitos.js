const saboresAlfajorcitos = [
    "Alfajor Sablée",
    "Alfajor de Maicena",
    "Alfajor Sablée de Cacao",
    "Alfacookies",
    "Alfajor de Nuez",
    "Alfajor de Limón",
    "Alfajor Mar del Plata",
    "Alfajor de Frutos Rojos",
    "Alfajor Mousse de Chocolate",
    "Alfajor Bon o Bon"
];

let seleccionAlfajorcitos = {};


/* =========================
   CARGAR ALFAJORCITOS
========================= */

function cargarAlfajorcitos() {

    const container = document.querySelector("#alfajorcitos-sabores");

    if (!container) {
        console.error("No se encontró #alfajorcitos-sabores");
        return;
    }

    seleccionAlfajorcitos = {};

    container.innerHTML = "";

    saboresAlfajorcitos.forEach((sabor, index) => {

        seleccionAlfajorcitos[index] = 0;

        const fila = document.createElement("div");

        fila.classList.add("alfajorcito-opcion");

        fila.innerHTML = `
            <span class="alfajorcito-nombre">
                ${sabor}
            </span>

            <div class="alfajorcito-contador">

                <button
                    type="button"
                    class="alfajorcito-btn restar-alfajorcito"
                    data-index="${index}"
                >
                    −
                </button>

                <span
                    id="alfajorcito-cantidad-${index}"
                    class="alfajorcito-cantidad"
                >
                    0
                </span>

                <button
                    type="button"
                    class="alfajorcito-btn sumar-alfajorcito"
                    data-index="${index}"
                >
                    +
                </button>

            </div>
        `;

        container.appendChild(fila);
    });

    activarContadoresAlfajorcitos();
    activarAgregarAlfajorcitos();
    actualizarTotalAlfajorcitos();
}


/* =========================
   CONTADORES + Y -
========================= */

function activarContadoresAlfajorcitos() {

    const botonesSumar =
        document.querySelectorAll(".sumar-alfajorcito");

    const botonesRestar =
        document.querySelectorAll(".restar-alfajorcito");


    botonesSumar.forEach((btn) => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            seleccionAlfajorcitos[index]++;

            actualizarAlfajorcito(index);
        });

    });


    botonesRestar.forEach((btn) => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            if (seleccionAlfajorcitos[index] > 0) {
                seleccionAlfajorcitos[index]--;
            }

            actualizarAlfajorcito(index);
        });

    });
}


/* =========================
   ACTUALIZAR CANTIDAD
========================= */

function actualizarAlfajorcito(index) {

    const cantidadElemento =
        document.querySelector(
            `#alfajorcito-cantidad-${index}`
        );

    if (cantidadElemento) {
        cantidadElemento.textContent =
            seleccionAlfajorcitos[index];
    }

    actualizarTotalAlfajorcitos();
}


/* =========================
   TOTAL
========================= */

function actualizarTotalAlfajorcitos() {

    const total = Object.values(seleccionAlfajorcitos)
        .reduce(
            (acumulador, cantidad) =>
                acumulador + cantidad,
            0
        );


    const totalElemento =
        document.querySelector("#alfajorcitos-total");

    if (totalElemento) {
        totalElemento.textContent = total;
    }


    const botonAgregar =
        document.querySelector(
            "#btn-agregar-alfajorcitos"
        );

    if (botonAgregar) {
        botonAgregar.disabled = total < 12;
    }
}


/* =========================
   AGREGAR AL CARRITO
========================= */

function activarAgregarAlfajorcitos() {

    const boton =
        document.querySelector(
            "#btn-agregar-alfajorcitos"
        );

    if (!boton) return;


    boton.addEventListener("click", () => {

        const total =
            Object.values(seleccionAlfajorcitos)
                .reduce(
                    (acumulador, cantidad) =>
                        acumulador + cantidad,
                    0
                );


        if (total < 12) {

            alert(
                "Elegí al menos 12 alfajorcitos."
            );

            return;
        }


        const variedadesSeleccionadas =
            saboresAlfajorcitos
                .map((sabor, index) => ({
                    nombre: sabor,
                    cantidad:
                        seleccionAlfajorcitos[index]
                }))
                .filter(
                    variedad =>
                        variedad.cantidad > 0
                );


        const productoAlfajorcitos = {

            id: "alfajorcitos-personalizados-v2",

            nombre: "Alfajorcitos",

            foto:
                "./img/Mini Pasteleria/alfajorcitos-seleccion.png",

            cantidadSeleccionada: total,

            variedadesSeleccionadas:
                variedadesSeleccionadas.map(
                    variedad =>
                        `${variedad.nombre} x${variedad.cantidad}`
                ),

            precio: null,

            categoria: "alfajorcitos"
        };


        console.log(
            "Agregando Alfajorcitos:",
            productoAlfajorcitos
        );


        /* =========================
           CARRITO GENERAL
        ========================= */

        if (typeof agregarAlCarrito === "function") {

            agregarAlCarrito(
                productoAlfajorcitos
            );

        } else {

            console.error(
                "La función agregarAlCarrito no existe."
            );

            alert(
                "No se pudo agregar al carrito."
            );

            return;
        }


        /* =========================
           ABRIR CARRITO
        ========================= */

        const overlay =
            document.querySelector(
                "#carrito-overlay"
            );

        if (overlay) {
            overlay.classList.add("activo");
        }

    });
}