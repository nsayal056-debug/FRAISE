console.log("script.js cargado correctamente");

let carrito = JSON.parse(localStorage.getItem("carritoFraise")) || [];

const productosFallback = [
    { id: "local-1", nombre: "Torta Frambali", precio: 28000, stock: 10, marca: "FRAISE", categoria: "tortas-modernas", descripcionCorta: "Bizcochuelo húmedo, crema y frutos rojos.", foto: "./img/Tortas Modernas/Torta Frambali.jpeg" },
    { id: "local-2", nombre: "Cheesecake frutos rojos", precio: 25000, stock: 8, marca: "FRAISE", categoria: "cheesecakes", descripcionCorta: "Base crocante, crema de queso y salsa de frutos rojos.", foto: "./img/Chessecakes/Chessecake frutos rojos edit.png" },
    { id: "local-3", nombre: "Lemon Pie", precio: 22000, stock: 12, marca: "FRAISE", categoria: "tartas", descripcionCorta: "Tarta fresca de limón con merengue italiano.", foto: "./img/Tartas/Lemon Pie.png" },
    { id: "local-4", nombre: "Matilda", precio: 30000, stock: 6, marca: "FRAISE", categoria: "tortas-basicas", descripcionCorta: "Torta intensa de chocolate con relleno cremoso.", foto: "./img/Tortas Basicas/matilda.png" }
];

function mostrarToast(mensaje) {
    const toast = document.getElementById("toast");
    if (!toast) return alert(mensaje);
    toast.textContent = mensaje;
    toast.classList.add("activo");
    setTimeout(() => toast.classList.remove("activo"), 2500);
}

function formatoPrecio(valor) {
    return Number(valor || 0).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}

async function renderizarProductos() {
    const contenedor = document.getElementById("productos-dinamicos");
    if (!contenedor) return;

    contenedor.innerHTML = "<p>Cargando productos...</p>";
    let productos = await obtenerProductos();
    if (!Array.isArray(productos) || productos.length === 0) productos = productosFallback;

    contenedor.innerHTML = productos.map(producto => `
        <article class="producto-card">
            <img src="${producto.foto || "./img/logo.jpg"}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcionCorta || producto.descripcion || "Producto artesanal FRAISE."}</p>
            <p class="producto-precio">${formatoPrecio(producto.precio)}</p>
            <button class="btn-ver btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
        </article>
    `).join("");

    contenedor.querySelectorAll(".btn-agregar").forEach(boton => {
        boton.addEventListener("click", () => {
            const producto = productos.find(item => String(item.id) === String(boton.dataset.id));
            agregarAlCarrito(producto);
        });
    });
}

function agregarAlCarrito(producto) {
    const item = carrito.find(prod => String(prod.id) === String(producto.id));
    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    mostrarToast(`${producto.nombre} se agregó al carrito ✨`);
}

function guardarCarrito() {
    localStorage.setItem("carritoFraise", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const cantidad = document.getElementById("carrito-cantidad");
    const lista = document.getElementById("carrito-lista");
    const totalVista = document.getElementById("carrito-total");
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const total = carrito.reduce((acc, item) => acc + Number(item.precio || 0) * item.cantidad, 0);

    if (cantidad) cantidad.textContent = totalCantidad;
    if (totalVista) totalVista.textContent = formatoPrecio(total);
    if (!lista) return;

    if (carrito.length === 0) {
        lista.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    lista.innerHTML = carrito.map(item => `
        <div class="carrito-item">
            <img src="${item.foto || "./img/logo.jpg"}" alt="${item.nombre}">
            <div>
                <h3>${item.nombre}</h3>
                <p>Precio: ${formatoPrecio(item.precio)}</p>
                <div class="cantidad-controles">
                    <button data-accion="restar" data-id="${item.id}">-</button>
                    <span>${item.cantidad}</span>
                    <button data-accion="sumar" data-id="${item.id}">+</button>
                    <button data-accion="eliminar" data-id="${item.id}">Eliminar</button>
                </div>
                <strong>Subtotal: ${formatoPrecio(Number(item.precio || 0) * item.cantidad)}</strong>
            </div>
        </div>
    `).join("");

    lista.querySelectorAll("button").forEach(boton => {
        boton.addEventListener("click", () => modificarCarrito(boton.dataset.id, boton.dataset.accion));
    });
}

function modificarCarrito(id, accion) {
    const item = carrito.find(prod => String(prod.id) === String(id));
    if (!item) return;

    if (accion === "sumar") item.cantidad += 1;
    if (accion === "restar") item.cantidad -= 1;
    if (accion === "eliminar" || item.cantidad <= 0) carrito = carrito.filter(prod => String(prod.id) !== String(id));

    guardarCarrito();
}

function inicializarCarrito() {
    const abrir = document.getElementById("abrir-carrito");
    const cerrar = document.getElementById("cerrar-carrito");
    const overlay = document.getElementById("carrito-overlay");
    const vaciar = document.getElementById("vaciar-carrito");
    const confirmar = document.getElementById("confirmar-carrito");

    const toggle = () => overlay?.classList.toggle("activo");
    abrir?.addEventListener("click", toggle);
    cerrar?.addEventListener("click", toggle);
    overlay?.addEventListener("click", event => { if (event.target === overlay) toggle(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") overlay?.classList.remove("activo"); });

    vaciar?.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        mostrarToast("Carrito vaciado");
    });

    confirmar?.addEventListener("click", async () => {
        if (carrito.length === 0) return mostrarToast("Agregá productos antes de confirmar");
        const pedido = {
            fecha: new Date().toISOString(),
            productos: carrito,
            total: carrito.reduce((acc, item) => acc + Number(item.precio || 0) * item.cantidad, 0)
        };
        try {
            await enviarCarrito(pedido);
            carrito = [];
            guardarCarrito();
            overlay?.classList.remove("activo");
            mostrarToast("Pedido enviado correctamente 💌");
        } catch (error) {
            console.error(error);
            mostrarToast("No se pudo enviar el pedido. Revisá MockAPI.");
        }
    });

    actualizarCarrito();
}

function setError(campo, mensaje) {
    const grupo = campo.closest(".form-group");
    let error = grupo.querySelector(".error");
    if (!error) {
        error = document.createElement("small");
        error.className = "error";
        grupo.appendChild(error);
    }
    error.textContent = mensaje;
    campo.classList.toggle("campo-error", Boolean(mensaje));
    campo.classList.toggle("campo-ok", !mensaje);
}

function validarCampo(campo) {
    const valor = campo.value.trim();
    let mensaje = "";

    if (campo.required && !valor) mensaje = "Este campo es obligatorio.";
    else if (campo.minLength > 0 && valor.length < campo.minLength) mensaje = `Debe tener al menos ${campo.minLength} caracteres.`;
    else if (campo.maxLength > 0 && valor.length > campo.maxLength) mensaje = `Debe tener como máximo ${campo.maxLength} caracteres.`;
    else if (campo.type === "number" && campo.min && Number(valor) < Number(campo.min)) mensaje = `El valor mínimo es ${campo.min}.`;
    else if (campo.type === "number" && campo.max && Number(valor) > Number(campo.max)) mensaje = `El valor máximo es ${campo.max}.`;
    else if (campo.type === "email" && valor && !/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(valor)) mensaje = "Ingresá un email válido.";
    else if (campo.type === "url" && valor) {
        try { new URL(valor); } catch { mensaje = "Ingresá una URL válida para la foto."; }
    }

    setError(campo, mensaje);
    return !mensaje;
}

function validarFormulario(formulario) {
    const campos = [...formulario.querySelectorAll("input, textarea, select")];
    return campos.every(validarCampo);
}

function prepararValidaciones(formulario) {
    formulario.querySelectorAll("input, textarea, select").forEach(campo => {
        campo.addEventListener("blur", () => validarCampo(campo));
        campo.addEventListener("input", () => validarCampo(campo));
    });
}

function inicializarFormularioAlta() {
    const formulario = document.querySelector("#form-alta");
    if (!formulario) return;
    prepararValidaciones(formulario);

    formulario.addEventListener("submit", async event => {
        event.preventDefault();
        if (!validarFormulario(formulario)) return mostrarToast("Revisá los campos marcados antes de enviar.");

        const producto = {
            nombre: document.getElementById("nombre").value.trim(),
            precio: Number(document.getElementById("precio").value),
            stock: Number(document.getElementById("stock").value),
            marca: document.getElementById("marca").value.trim(),
            categoria: document.getElementById("categoria").value,
            descripcionCorta: document.getElementById("descripcion-corta").value.trim(),
            descripcionLarga: document.getElementById("descripcion-larga").value.trim(),
            envioSinCargo: document.getElementById("envioSinCargo").value === "si",
            edadDesde: Number(document.getElementById("edad-desde").value),
            edadHasta: Number(document.getElementById("edad-hasta").value),
            foto: document.getElementById("foto").value.trim()
        };

        if (producto.edadDesde > producto.edadHasta) return mostrarToast("Edad desde no puede ser mayor que edad hasta.");

        try {
            await crearProducto(producto);
            mostrarToast("Producto agregado correctamente ✨");
            formulario.reset();
            formulario.querySelectorAll(".error").forEach(error => error.textContent = "");
            formulario.querySelectorAll(".campo-ok, .campo-error").forEach(campo => campo.classList.remove("campo-ok", "campo-error"));
        } catch (error) {
            console.error(error);
            mostrarToast("No se pudo guardar el producto. Revisá MockAPI.");
        }
    });
}

function inicializarFormularioContacto() {
    const formulario = document.querySelector("#form-contacto");
    if (!formulario) return;
    prepararValidaciones(formulario);

    formulario.addEventListener("submit", event => {
        event.preventDefault();
        if (!validarFormulario(formulario)) return mostrarToast("Revisá los campos marcados antes de enviar.");
        mostrarToast("Mensaje enviado correctamente 💌");
        formulario.reset();
        formulario.querySelectorAll(".error").forEach(error => error.textContent = "");
        formulario.querySelectorAll(".campo-ok, .campo-error").forEach(campo => campo.classList.remove("campo-ok", "campo-error"));
    });
}

document.addEventListener("DOMContentLoaded", inicializarCarrito);

function inicializarFrambali() {

    console.log("Frambali inicializado");

    const formCompra = document.getElementById("formCompra");
    const porciones = document.getElementById("porciones");
    const precioFinal = document.getElementById("precio-final");
    const mensajeCompra = document.getElementById("mensajeCompra");

    if (!formCompra) return;

    const precios = {
        10: 28000,
        20: 48000,
        30: 68000,
        40: 88000
    };

    function actualizarPrecio() {
        precioFinal.value = `$${precios[porciones.value].toLocaleString("es-AR")}`;
    }

    porciones.addEventListener("change", actualizarPrecio);

    formCompra.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Compra realizada");

        const producto = {
            id: "frambali",
            nombre: "Torta Frambalí",
            precio: precios[porciones.value],
            stock: 10,
            marca: "FRAISE",
            categoria: "tortas-modernas",
            descripcionCorta: "Torta premium de chocolate, frutos rojos y crema suave.",
            foto: "./img/Tortas Modernas/Torta Frambali.jpeg"
        };

        agregarAlCarrito(producto);

        mensajeCompra.style.display = "block";
        mensajeCompra.textContent = "¡Producto agregado al carrito con éxito!";

        formCompra.reset();
        actualizarPrecio();
    });

    actualizarPrecio();
}