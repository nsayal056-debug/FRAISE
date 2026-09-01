const API_BASE = "https://6a4bc33af5eab0bb6b636c31.mockapi.io";
const API_PRODUCTOS = "http://localhost:8080/api/productos";
const API_CARRITO = "http://localhost:8080/api/carrito";

async function obtenerProductos() {
    try {
        const respuesta = await fetch(API_PRODUCTOS);
        if (!respuesta.ok) throw new Error("No se pudieron obtener los productos");
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
}

async function obtenerProductoPorId(id) {
    try {
        const respuesta = await fetch(`${API_PRODUCTOS}/${id}`);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el producto");
        }

        return await respuesta.json();

    } catch (error) {
        console.error("Error al obtener el producto:", error);
        return null;
    }
}

async function crearProducto(producto) {
    const respuesta = await fetch(API_PRODUCTOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });
    if (!respuesta.ok) throw new Error("Error al guardar el producto");
    return respuesta.json();
}

async function enviarCarrito(pedido) {
    const respuesta = await fetch(API_CARRITO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
    });
    if (!respuesta.ok) throw new Error("Error al enviar el carrito");
    return respuesta.json();
}
