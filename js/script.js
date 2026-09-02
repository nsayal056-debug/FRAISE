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

async function renderizarProductos(categoria = null) {
    const contenedor = document.getElementById("productos-dinamicos");
    if (!contenedor) return;

    contenedor.innerHTML = "<p>Cargando productos...</p>";

    let productos = await obtenerProductos();

    console.log("Categoria recibida:", categoria);
    console.log("Productos recibidos:", productos);
    console.log("Categorias MongoDB:", productos.map(p => p.categoria));

    if (!Array.isArray(productos) || productos.length === 0) {
        productos = productosFallback;
    }

    if (categoria) {
        productos = productos.filter(
            producto => producto.categoria === categoria
        );
    }

    contenedor.innerHTML = productos.map(producto => `
    <article class="producto-card">

        <img
            src="${producto.foto || "./img/logo.jpg"}"
            alt="${producto.nombre}"
        >

        <h2>${producto.nombre}</h2>

        <p>
            ${producto.descripcionCorta || producto.descripcion || "Producto artesanal FRAISE."}
        </p>

        <a
            href="#/producto/${producto._id || producto.id}"
            class="btn-ver">
            Ver más →
        </a>

    </article>
`).join("");
}

async function inicializarProductoDetalle(id) {

    const contenedor = document.getElementById("producto-detalle-contenido");

    if (!contenedor) return;

    contenedor.innerHTML = "<p>Cargando producto...</p>";

    const producto = await obtenerProductoPorId(id);

    if (!producto) {
        contenedor.innerHTML = "<p>No se pudo cargar el producto.</p>";
        return;
    }

    let opcionesHTML = "";
let tituloOpciones = "Elegí el tamaño";

// CASO ESPECIAL: MINI DELICIAS / ALFAJORCITOS
if (
    Array.isArray(producto.cantidades) &&
    producto.cantidades.length > 0 &&
    Array.isArray(producto.variedades) &&
    producto.variedades.length > 0
) {

    tituloOpciones = "Armá tu pedido";

    opcionesHTML = `
        <div class="producto-cantidades">

            <h3>Elegí la cantidad</h3>

            ${producto.cantidades.map((cantidad, index) => `
                <label class="producto-opcion">

                    <input
                        type="radio"
                        name="cantidad-producto"
                        value="${cantidad}"
                        ${index === 0 ? "checked" : ""}
                    >

                    <span>${cantidad}</span>

                </label>
            `).join("")}

        </div>

        <div class="producto-variedades">

            <h3>Elegí tus variedades</h3>

            ${producto.variedades.map(variedad => `
                <label class="producto-variedad">

                    <input
                        type="checkbox"
                        name="variedad-producto"
                        value="${variedad}"
                    >

                    <span>${variedad}</span>

                </label>
            `).join("")}

        </div>
    `;


// RESTO DE LOS PRODUCTOS
} else if (
    Array.isArray(producto.opciones) &&
    producto.opciones.length > 0
) {

    opcionesHTML = producto.opciones.map((opcion, index) => `
        <label class="producto-opcion">

            <input
                type="radio"
                name="opcion-producto"
                value="${index}"
                ${index === 0 ? "checked" : ""}
            >

            <span>
                ${opcion.tamaño}

                ${opcion.precio != null
                    ? ` - ${formatoPrecio(opcion.precio)}`
                    : " - Consultar precio"
                }
            </span>

        </label>
    `).join("");

} else {

    tituloOpciones = "Información";

    opcionesHTML = "<p>Consultar disponibilidad.</p>";
}

    contenedor.innerHTML = `
        <div class="producto-detalle-card">

            <div class="producto-detalle-imagen">
                <img
                    src="${producto.foto || "./img/logo.jpg"}"
                    alt="${producto.nombre}"
                >
            </div>

            <div class="producto-detalle-info">

                <h1>${producto.nombre}</h1>

                <p class="producto-detalle-descripcion">
                    ${producto.descripcion || "Producto artesanal FRAISE."}
                </p>

                <div class="producto-detalle-opciones">

                    <h3>${tituloOpciones}</h3>

                    ${opcionesHTML}

                </div>

                <button
                    id="btn-agregar-detalle"
                    class="btn-agregar-detalle"
                    type="button">
                                Agregar al carrito
                </button>

            </div>

        </div>
    `;

    const botonAgregar = document.getElementById("btn-agregar-detalle");

botonAgregar?.addEventListener("click", () => {

    // ==========================================
    // MINI DELICIAS / ALFAJORCITOS
    // ==========================================

    if (
        Array.isArray(producto.cantidades) &&
        Array.isArray(producto.variedades)
    ) {

        const cantidadSeleccionada = document.querySelector(
            'input[name="cantidad-producto"]:checked'
        );

        const variedadesSeleccionadas = [
            ...document.querySelectorAll(
                'input[name="variedad-producto"]:checked'
            )
        ].map(input => input.value);

        if (!cantidadSeleccionada) {
            return mostrarToast("Elegí una cantidad.");
        }

        if (variedadesSeleccionadas.length === 0) {
            return mostrarToast("Elegí al menos una variedad.");
        }

        const productoCarrito = {
            ...producto,
            cantidadSeleccionada: cantidadSeleccionada.value,
            variedadesSeleccionadas: variedadesSeleccionadas,
            precio: null
        };

        agregarAlCarrito(productoCarrito);

        return;
    }


    // ==========================================
    // PRODUCTOS NORMALES
    // ==========================================

    const seleccionada = document.querySelector(
        'input[name="opcion-producto"]:checked'
    );

    let productoCarrito = { ...producto };

    if (seleccionada && producto.opciones) {

        const opcion = producto.opciones[Number(seleccionada.value)];

        productoCarrito = {
            ...producto,
            tamañoSeleccionado: opcion.tamaño,
            precio: opcion.precio
        };
    }

    agregarAlCarrito(productoCarrito);
});
}

function obtenerIdProducto(producto) {
    return producto._id || producto.id;
}

function agregarAlCarrito(producto) {

    const idProducto = obtenerIdProducto(producto);

    const item = carrito.find(
        prod =>
            String(obtenerIdProducto(prod)) ===
            String(idProducto)
    );

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();

    mostrarToast(
        `${producto.nombre} se agregó al carrito ✨`
    );
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

 lista.innerHTML = carrito.map(item => {

    const esEspecial =
        item.cantidadSeleccionada &&
        Array.isArray(item.variedadesSeleccionadas);

    const detalleEspecial = esEspecial
        ? `
            <p><strong>Cantidad elegida:</strong> ${item.cantidadSeleccionada}</p>
            <p><strong>Variedades:</strong> ${item.variedadesSeleccionadas.join(", ")}</p>
          `
        : "";

    const precioTexto =
        item.precio != null
            ? formatoPrecio(item.precio)
            : "A consultar";

    const subtotalTexto =
        item.precio != null
            ? formatoPrecio(Number(item.precio) * item.cantidad)
            : "A consultar";

    return `
        <div class="carrito-item">

            <img
                src="${item.foto || "./img/logo.jpg"}"
                alt="${item.nombre}"
            >

            <div>

                <h3>${item.nombre}</h3>

                ${detalleEspecial}

                <p>
                    <strong>Precio:</strong> ${precioTexto}
                </p>

                <div class="cantidad-controles">

                    <button
                        data-accion="restar"
                        data-id="${obtenerIdProducto(item)}">
                        -
                    </button>

                    <span>${item.cantidad}</span>

                    <button
                        data-accion="sumar"
                        data-id="${obtenerIdProducto(item)}">
                        +
                    </button>

                    <button
                        data-accion="eliminar"
                        data-id="${obtenerIdProducto(item)}">
                        Eliminar
                    </button>

                </div>

                <strong>
                    Subtotal: ${subtotalTexto}
                </strong>

            </div>

        </div>
    `;
}).join("");
/* =========================
   ACTIVAR BOTONES CARRITO
========================= */

lista.querySelectorAll(".cantidad-controles button").forEach((boton) => {

    boton.addEventListener("click", () => {

        const id = boton.dataset.id;
        const accion = boton.dataset.accion;

        modificarCarrito(id, accion);

    });

});
}





function modificarCarrito(id, accion) {

    const item = carrito.find(
        prod =>
            String(obtenerIdProducto(prod)) ===
            String(id)
    );

    if (!item) return;

    if (accion === "sumar") {
        item.cantidad += 1;
    }

    if (accion === "restar") {
        item.cantidad -= 1;
    }

    if (accion === "eliminar" || item.cantidad <= 0) {
        carrito = carrito.filter(
            prod =>
                String(obtenerIdProducto(prod)) !==
                String(id)
        );
    }

    guardarCarrito();
}

function inicializarCarrito() {
    const abrir = document.getElementById("abrir-carrito");
    const cerrar = document.getElementById("cerrar-carrito");
    const overlay = document.getElementById("carrito-overlay");
    const vaciar = document.getElementById("vaciar-carrito");
    const confirmar = document.getElementById("confirmar-carrito");
    const fechaEntrega = document.getElementById("fecha-entrega");
    const clienteNombre = document.getElementById("cliente-nombre");
    const clienteTelefono = document.getElementById("cliente-telefono");
    const clienteObservaciones = document.getElementById("cliente-observaciones");

    if (fechaEntrega) {
    const ahora = new Date();

    const fechaMinima = new Date(
        ahora.getTime() + 72 * 60 * 60 * 1000
    );

    const año = fechaMinima.getFullYear();
    const mes = String(fechaMinima.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaMinima.getDate()).padStart(2, "0");

    fechaEntrega.min = `${año}-${mes}-${dia}`;
}

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

    if (carrito.length === 0) {
        return mostrarToast("Agregá productos antes de confirmar");
    }

    // VALIDAR NOMBRE
    if (!clienteNombre || !clienteNombre.value.trim()) {
        return mostrarToast("Ingresá tu nombre.");
    }

    // VALIDAR TELÉFONO
    if (!clienteTelefono || !clienteTelefono.value.trim()) {
        return mostrarToast("Ingresá tu teléfono.");
    }


    if (!fechaEntrega || !fechaEntrega.value) {
        return mostrarToast(
            "Seleccioná la fecha para la que necesitás tu pedido 📅"
        );
    }

    const ahora = new Date();

    const fechaSeleccionada = new Date(
        `${fechaEntrega.value}T23:59:59`
    );

    const minimo72Horas = new Date(
        ahora.getTime() + 72 * 60 * 60 * 1000
    );

    if (fechaSeleccionada < minimo72Horas) {
        return mostrarToast(
            "Los pedidos deben realizarse con al menos 72 horas de anticipación."
        );
    }

    const total = carrito.reduce(
        (acc, item) =>
            acc + Number(item.precio || 0) * item.cantidad,
        0
    );

   const pedido = {
    cliente: {
        nombre: clienteNombre.value.trim(),
        telefono: clienteTelefono.value.trim(),
        observaciones: clienteObservaciones?.value.trim() || ""
    },

        fechaPedido: new Date().toISOString(),
        fechaEntrega: fechaEntrega.value,
        productos: carrito,
        total
};

const fechaFormateada =
    fechaEntrega.value.split("-").reverse().join("/");

   const emoji = {
    saludo: String.fromCodePoint(0x1F44B),
    torta: String.fromCodePoint(0x1F370),
    cumpleaños: String.fromCodePoint(0x1F382),
    persona: String.fromCodePoint(0x1F464),
    telefono: String.fromCodePoint(0x1F4DE),
    carrito: String.fromCodePoint(0x1F6D2),
    fecha: String.fromCodePoint(0x1F4C5),
    nota: String.fromCodePoint(0x1F4DD),
    dinero: String.fromCodePoint(0x1F4B0),
    brillo: String.fromCodePoint(0x2728)
};

console.log("Emoji saludo:", emoji.saludo);
console.log("Emoji codificado:", encodeURIComponent(emoji.saludo));

const detalleProductos = carrito
    .map((item, index) => {

        const numeroProducto = index + 1;

        const esEspecial =
            item.cantidadSeleccionada &&
            Array.isArray(item.variedadesSeleccionadas);

        // PRODUCTOS PERSONALIZADOS / ESPECIALES
        if (esEspecial) {

            const detalles = item.variedadesSeleccionadas
                .map(detalle => `• ${detalle}`)
                .join("\n");

            return [
                "━━━━━━━━━━━━━━━━━━━━",
                `*PRODUCTO ${numeroProducto}* 🤍`,
                `*${item.nombre.toUpperCase()}*`,
                "",
                `Cantidad: ${item.cantidadSeleccionada}`,
                "",
                "*Detalles del producto:*",
                detalles,
                "",
                "*Precio: A consultar*",
                "━━━━━━━━━━━━━━━━━━━━"
            ].join("\n");
        }

        // PRODUCTOS NORMALES
        const tamaño = item.tamañoSeleccionado
            ? `Tamaño: ${item.tamañoSeleccionado}`
            : "";

        const precioTexto =
            item.precio != null
                ? formatoPrecio(item.precio)
                : "A consultar";

        const subtotalTexto =
            item.precio != null
                ? formatoPrecio(
                    Number(item.precio) * item.cantidad
                )
                : "A consultar";

        const lineas = [
            "━━━━━━━━━━━━━━━━━━━━",
            `*PRODUCTO ${numeroProducto}* 🤍`,
            `*${item.nombre.toUpperCase()}*`,
            "",
            `Cantidad: ${item.cantidad}`
        ];

        if (tamaño) {
            lineas.push(tamaño);
        }

        lineas.push(
            `Precio: ${precioTexto}`,
            `Subtotal: ${subtotalTexto}`,
            "━━━━━━━━━━━━━━━━━━━━"
        );

        return lineas.join("\n");
    })
    .join("\n\n");


const hayPrecioAConsultar = carrito.some(
    item => item.precio == null
);

const todosSinPrecio = carrito.every(
    item => item.precio == null
);

const hayImagenReferencia = carrito.some(item =>
    item.categoria === "tortas-personalizadas" &&
    Array.isArray(item.variedadesSeleccionadas) &&
    item.variedadesSeleccionadas.some(detalle =>
        detalle.includes("Imagen de referencia:")
    )
);

const avisoImagenReferencia = hayImagenReferencia
    ? `

📸 *IMPORTANTE*
Recordá adjuntar en este chat la imagen de referencia que seleccionaste para tu torta.
`
    : "";

const mensajeWhatsApp = `
Hola FRAISE 👋🏻
Quisiera realizar el siguiente pedido 🤍

*DATOS DEL PEDIDO*
Nombre: ${clienteNombre.value.trim()}
Teléfono: ${clienteTelefono.value.trim()}

*DETALLE DEL PEDIDO* 🤍
${detalleProductos}

📅 *Fecha solicitada*
${fechaFormateada}

📝 *Observaciones*
${clienteObservaciones?.value.trim() || "Sin observaciones"}

${
    todosSinPrecio
        ? "*Total: A consultar*"
        : hayPrecioAConsultar
            ? `*Total parcial: ${formatoPrecio(total)} + productos a consultar*`
            : `*Total: ${formatoPrecio(total)}*`
}

${avisoImagenReferencia}

✨ La fecha solicitada está sujeta a disponibilidad.
`.trim();

    try {

        await enviarCarrito(pedido);

    const numeroWhatsApp = "5492478466498";

    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);

    const urlWhatsApp =
    `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeCodificado}`;

window.open(urlWhatsApp, "_blank");
        carrito = [];
        guardarCarrito();

        fechaEntrega.value = "";

        clienteNombre.value = "";
        clienteTelefono.value = "";

    if (clienteObservaciones) {
        clienteObservaciones.value = "";
}

        overlay?.classList.remove("activo");

        mostrarToast(
            "Pedido preparado correctamente 💌"
        );

    } catch (error) {

        console.error(error);

        mostrarToast(
            "No se pudo procesar el pedido."
        );
    }
});
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