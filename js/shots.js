const shots = [
    {
        nombre: "Cheesecake Frutos Rojos",
        imagen: "./img/Shots/shot-frutos-rojos.png"
    },
    {
        nombre: "Chocotorta",
        imagen: "./img/Shots/shot-chocotorta.png"
    },
    {
        nombre: "Oreo",
        imagen: "./img/Shots/shot-oreo.png"
    },
    {
        nombre: "Brownie",
        imagen: "./img/Shots/shot-brownie.png"
    },
    {
        nombre: "Frutilla",
        imagen: "./img/Shots/shot-frutilla.png"
    },
    {
        nombre: "Tiramisú",
        imagen: "./img/Shots/shot-tiramisu.png"
    }
];


let seleccionShots = {};


/* =========================
   CARGAR SHOTS
========================= */

function cargarShots() {

    const container = document.querySelector("#shots-container");

    if (!container) {
        console.error("No se encontró #shots-container");
        return;
    }

    seleccionShots = {};

    container.innerHTML = "";

    shots.forEach((shot, index) => {

        seleccionShots[index] = 0;

        const card = document.createElement("div");

        card.classList.add("producto-card", "shot-card");

        card.innerHTML = `
            <img
                src="${shot.imagen}"
                alt="${shot.nombre}"
                class="shot-imagen"
            >

            <h2>${shot.nombre}</h2>

            <div class="shot-contador">

                <button
                    type="button"
                    class="shot-btn restar-shot"
                    data-index="${index}"
                >
                    −
                </button>

                <span
                    id="shot-cantidad-${index}"
                    class="shot-cantidad"
                >
                    0
                </span>

                <button
                    type="button"
                    class="shot-btn sumar-shot"
                    data-index="${index}"
                >
                    +
                </button>

            </div>
        `;

        container.appendChild(card);
    });

    activarContadoresShots();
    activarAgregarShots();
    actualizarTotalShots();
}


/* =========================
   CONTADORES + Y -
========================= */

function activarContadoresShots() {

    const botonesSumar = document.querySelectorAll(".sumar-shot");
    const botonesRestar = document.querySelectorAll(".restar-shot");


    botonesSumar.forEach((btn) => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            seleccionShots[index]++;

            actualizarShots(index);
        });

    });


    botonesRestar.forEach((btn) => {

        btn.addEventListener("click", () => {

            const index = Number(btn.dataset.index);

            if (seleccionShots[index] > 0) {
                seleccionShots[index]--;
            }

            actualizarShots(index);
        });

    });
}


/* =========================
   ACTUALIZAR CANTIDAD
========================= */

function actualizarShots(index) {

    const cantidadElemento = document.querySelector(
        `#shot-cantidad-${index}`
    );

    if (cantidadElemento) {
        cantidadElemento.textContent = seleccionShots[index];
    }

    actualizarTotalShots();
}


/* =========================
   TOTAL SHOTS
========================= */

function actualizarTotalShots() {

    const total = Object.values(seleccionShots).reduce(
        (acumulador, cantidad) => acumulador + cantidad,
        0
    );

    const totalElemento = document.querySelector("#shots-total");

    if (totalElemento) {
        totalElemento.textContent = total;
    }

    const botonAgregar = document.querySelector("#btn-agregar-shots");

    if (botonAgregar) {
        botonAgregar.disabled = total < 6;
    }
}


/* =========================
   AGREGAR AL CARRITO
========================= */

function activarAgregarShots() {

    const boton = document.querySelector("#btn-agregar-shots");

    if (!boton) return;

    boton.addEventListener("click", () => {

        const total = Object.values(seleccionShots).reduce(
            (acumulador, cantidad) => acumulador + cantidad,
            0
        );

        if (total < 6) {
            alert("Elegí al menos 6 shots.");
            return;
        }

        const variedadesSeleccionadas = shots
            .map((shot, index) => ({
                nombre: shot.nombre,
                cantidad: seleccionShots[index]
            }))
            .filter((shot) => shot.cantidad > 0);


        const productoShots = {

            id: "shots-personalizados",

            nombre: "Shots Dulces",

            foto: "./img/shots/shot-frutos-rojos.png",

            cantidadSeleccionada: total,

            variedadesSeleccionadas: variedadesSeleccionadas.map(
                (variedad) =>
                    `${variedad.nombre} x${variedad.cantidad}`
            ),

            precio: null,

            categoria: "shots"
        };


        console.log(
            "Agregando Shots Dulces al carrito:",
            productoShots
        );


        /* USAMOS EL CARRITO GENERAL */

        if (typeof agregarAlCarrito === "function") {

            agregarAlCarrito(productoShots);

        } else {

            console.error(
                "La función agregarAlCarrito no existe."
            );

            alert(
                "No se pudo agregar al carrito."
            );

            return;
        }


        /* ABRIR CARRITO */

        const overlay =
            document.querySelector("#carrito-overlay");

        if (overlay) {
            overlay.classList.add("activo");
        }

    });
}