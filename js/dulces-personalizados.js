const dulcesPersonalizados = [
    {
        id: "dulce-cupcakes",
        nombre: "Cupcakes",
        imagen: "./img/Personalizadas/cupcakes.png"
    },
    {
        id: "dulce-cakepops",
        nombre: "Cake Pops",
        imagen: "./img/Personalizadas/cakepops.png"
    },
    {
        id: "dulce-oreo-banadas",
        nombre: "Oreos bañadas",
        imagen: "./img/Personalizadas/oreo banadas.png"
    },
    {
        id: "dulce-paletas",
        nombre: "Paletas",
        imagen: "./img/Personalizadas/paletas.png"
    }
];

let seleccionDulcesPersonalizados = {};


/* =========================
   CARGAR DULCES
========================= */

function cargarDulcesPersonalizados() {

    const container = document.querySelector(
        "#dulces-personalizados-container"
    );

    if (!container) {
        console.error(
            "No se encontró #dulces-personalizados-container"
        );
        return;
    }

    seleccionDulcesPersonalizados = {};

    container.innerHTML = "";

    dulcesPersonalizados.forEach((producto, index) => {

        seleccionDulcesPersonalizados[index] = 0;

        const card = document.createElement("div");

        card.classList.add("dulce-personalizado-card");

        card.innerHTML = `

            <div class="dulce-personalizado-imagen">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <div class="dulce-personalizado-overlay">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <div class="dulce-personalizado-contador">

                        <button
                            type="button"
                            class="dulce-btn restar-dulce"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span
                            id="dulce-cantidad-${index}"
                            class="dulce-cantidad"
                        >
                            0
                        </span>

                        <button
                            type="button"
                            class="dulce-btn sumar-dulce"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

        container.appendChild(card);
    });

    activarContadoresDulcesPersonalizados();
    activarAgregarDulcesPersonalizados();
    actualizarTotalDulcesPersonalizados();
}


/* =========================
   CONTADORES
========================= */

function activarContadoresDulcesPersonalizados() {

    const botonesSumar =
        document.querySelectorAll(".sumar-dulce");

    const botonesRestar =
        document.querySelectorAll(".restar-dulce");


    botonesSumar.forEach((btn) => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            seleccionDulcesPersonalizados[index]++;

            actualizarDulcePersonalizado(index);
        });

    });


    botonesRestar.forEach((btn) => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            if (
                seleccionDulcesPersonalizados[index] > 0
            ) {
                seleccionDulcesPersonalizados[index]--;
            }

            actualizarDulcePersonalizado(index);
        });

    });

}


/* =========================
   ACTUALIZAR CARD
========================= */

function actualizarDulcePersonalizado(index) {

    const cantidadElemento =
        document.querySelector(
            `#dulce-cantidad-${index}`
        );

    if (cantidadElemento) {

        cantidadElemento.textContent =
            seleccionDulcesPersonalizados[index];
    }

    actualizarTotalDulcesPersonalizados();
}


/* =========================
   TOTAL
========================= */

function actualizarTotalDulcesPersonalizados() {

    const total =
        Object.values(
            seleccionDulcesPersonalizados
        ).reduce(
            (acumulador, cantidad) =>
                acumulador + cantidad,
            0
        );


    const totalElemento =
        document.querySelector(
            "#dulces-personalizados-total"
        );

    if (totalElemento) {
        totalElemento.textContent = total;
    }


    const botonAgregar =
        document.querySelector(
            "#btn-agregar-dulces-personalizados"
        );

    if (botonAgregar) {

        botonAgregar.disabled =
            total < 6;
    }

}


/* =========================
   AGREGAR AL CARRITO
========================= */

function activarAgregarDulcesPersonalizados() {

    const boton =
        document.querySelector(
            "#btn-agregar-dulces-personalizados"
        );

    if (!boton) return;


    boton.addEventListener("click", () => {

        const total =
            Object.values(
                seleccionDulcesPersonalizados
            ).reduce(
                (acumulador, cantidad) =>
                    acumulador + cantidad,
                0
            );


        if (total < 6) {

            alert(
                "Elegí al menos 6 unidades."
            );

            return;
        }


        dulcesPersonalizados.forEach(
            (producto, index) => {

                const cantidadSeleccionada =
                    seleccionDulcesPersonalizados[index];

                if (cantidadSeleccionada <= 0) {
                    return;
                }


                const productoCarrito = {

                    id:
                        `${producto.id}-${Date.now()}-${index}`,

                    nombre:
                        producto.nombre,

                    foto:
                        producto.imagen,

                    cantidadSeleccionada:
                        cantidadSeleccionada,

                    variedadesSeleccionadas: [
                        `${producto.nombre} x${cantidadSeleccionada}`
                    ],

                    precio:
                        null,

                    categoria:
                        "dulces-personalizados"
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

            }
        );


        const overlay =
            document.querySelector(
                "#carrito-overlay"
            );

        if (overlay) {
            overlay.classList.add("activo");
        }

    });

}