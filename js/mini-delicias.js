const miniDelicias = [
    {
        nombre: "Mini Brownie",
        imagen: "./img/Mini Pasteleria/mini-brownie.png"
    },
    {
        nombre: "Mini Chocotorta",
        imagen: "./img/Mini Pasteleria/mini-chocotorta.png"
    },
    {
        nombre: "Rogelitos",
        imagen: "./img/Mini Pasteleria/rogelitos.png"
    },
    {
        nombre: "Mini Lemon Pie",
        imagen: "./img/Mini Pasteleria/mini-lemon-pie.png"
    }
];

let seleccionMiniDelicias = {};


/* =========================
   CARGAR MINI DELICIAS
========================= */

function cargarMiniDelicias() {

    const container = document.querySelector("#mini-delicias-container");

    if (!container) return;

    seleccionMiniDelicias = {};

    container.innerHTML = "";

    miniDelicias.forEach((producto, index) => {

        seleccionMiniDelicias[index] = 0;

        const card = document.createElement("div");

        card.classList.add("mini-delicia-card");

        card.innerHTML = `
            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="mini-delicia-imagen"
            >

            <h2>${producto.nombre}</h2>

            <div class="mini-delicia-contador">

                <button
                    type="button"
                    class="mini-delicia-btn restar-mini-delicia"
                    data-index="${index}"
                >
                    −
                </button>

                <span
                    id="mini-delicia-cantidad-${index}"
                    class="mini-delicia-cantidad"
                >
                    0
                </span>

                <button
                    type="button"
                    class="mini-delicia-btn sumar-mini-delicia"
                    data-index="${index}"
                >
                    +
                </button>

            </div>
        `;

        container.appendChild(card);

    });

    activarContadoresMiniDelicias();
    activarAgregarMiniDelicias();
    actualizarTotalMiniDelicias();
}



/* =========================
   CONTADORES
========================= */

function activarContadoresMiniDelicias() {

    const sumar = document.querySelectorAll(".sumar-mini-delicia");
    const restar = document.querySelectorAll(".restar-mini-delicia");

    sumar.forEach(btn => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            seleccionMiniDelicias[index]++;

            actualizarMiniDelicia(index);
        });
    });

    restar.forEach(btn => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            if (seleccionMiniDelicias[index] > 0) {
                seleccionMiniDelicias[index]--;
            }

            actualizarMiniDelicia(index);
        });
    });
}


/* =========================
   ACTUALIZAR CANTIDAD
========================= */

function actualizarMiniDelicia(index) {

    const cantidad = document.querySelector(
        `#mini-delicia-cantidad-${index}`
    );

    if (cantidad) {
        cantidad.textContent = seleccionMiniDelicias[index];
    }

    actualizarTotalMiniDelicias();
}


/* =========================
   TOTAL
========================= */

function actualizarTotalMiniDelicias() {

    const total = Object.values(seleccionMiniDelicias)
        .reduce((acc, cantidad) => acc + cantidad, 0);

    const totalElemento =
        document.querySelector("#mini-delicias-total");

    if (totalElemento) {
        totalElemento.textContent = total;
    }

    const boton =
        document.querySelector("#btn-agregar-mini-delicias");

    if (boton) {
        boton.disabled = total < 12;
    }
}


/* =========================
   AGREGAR AL CARRITO
========================= */

function activarAgregarMiniDelicias() {

    const boton =
        document.querySelector("#btn-agregar-mini-delicias");

    if (!boton) return;

    boton.addEventListener("click", () => {

        const total = Object.values(seleccionMiniDelicias)
            .reduce((acc, cantidad) => acc + cantidad, 0);

        if (total < 12) {
            alert("Elegí al menos 12 Mini Delicias.");
            return;
        }

        const variedadesSeleccionadas = miniDelicias
            .map((producto, index) => ({
                nombre: producto.nombre,
                cantidad: seleccionMiniDelicias[index]
            }))
            .filter(producto => producto.cantidad > 0);


        const productoCarrito = {

            id: "mini-delicias-personalizadas",

            nombre: "Mini Delicias",

            foto: "./img/Mini Pasteleria/mini-delicias-grnl.png",

            cantidadSeleccionada: total,

            variedadesSeleccionadas:
                variedadesSeleccionadas.map(
                    variedad =>
                        `${variedad.nombre} x${variedad.cantidad}`
                ),

            precio: null,

            categoria: "mini-delicias"
        };


        if (typeof agregarAlCarrito === "function") {

            agregarAlCarrito(productoCarrito);

        } else {

            console.error(
                "La función agregarAlCarrito no existe."
            );

            return;
        }


        const overlay =
            document.querySelector("#carrito-overlay");

        if (overlay) {
            overlay.classList.add("activo");
        }
    });
}