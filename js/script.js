// =========================================
// FORMULARIO ALTA
// =========================================

const formularioAlta = document.querySelector(".alta-formulario form");

if (formularioAlta) {

    formularioAlta.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Producto agregado correctamente ✨");

        formularioAlta.reset();

    });

}

// =========================================
// FORMULARIO CONTACTO
// =========================================

const formularioContacto = document.querySelector(".contacto-formulario form");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Mensaje enviado correctamente 💌");

        formularioContacto.reset();

    });

}

// =========================================
// MENU HAMBURGUESA
// =========================================

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

//=========================================
//  TORTA FRAMBALI
//=========================================

const porciones =
document.getElementById("porciones");

const precioFinal =
document.getElementById("precio-final");

/* PRECIOS */

const precios = {

    10: 28000,
    20: 39000,
    30: 52000,
    40: 70000

};

/* ACTUALIZAR PRECIO */

function actualizarPrecio(){

    const cantidad =
    porciones.value;

    const total =
    precios[cantidad];

    precioFinal.value =
    `$${total.toLocaleString("es-AR")}`;

}

/* EVENTO */

porciones.addEventListener(
    "change",
    actualizarPrecio
);

/* PRECIO INICIAL */

actualizarPrecio();

/* COMPRA */

const formulario =
document.querySelector(".contacto-form");

formulario.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        console.log("Compra realizada");

        console.log(
            "Porciones:",
            porciones.value
        );

        console.log(
            "Precio:",
            precioFinal.value
        );

    }
);