const app = document.getElementById("app");

const routes = {
    "/": "views/home.html",
    "/productos": "views/productos.html",
    "/tortas-modernas": "views/tortas-modernas.html",
    "/cheesecakes": "views/cheesecakes.html",
    "/tartas": "views/tartas.html",
    "/tortas-basicas": "views/tortas-basicas.html",
    "/alta": "views/alta.html",
    "/contacto": "views/contacto.html",
    "/nosotros": "views/nosotros.html",

    "/frambali": "views/frambali.html",
    "/doble-mousse": "views/doble-mousse.html",
    "/charlotte-frutos-rojos": "views/charlotte-frutos-rojos.html",
    "/frambuesa-queso": "views/frambuesa-queso.html",

    "/brownie": "views/brownie.html",
    "/matilda": "views/matilda.html",
    "/choco-oreo": "views/choco-oreo.html",
    "/choco-torta": "views/choco-torta.html",
    "/rogel": "views/rogel.html",

    "/lemon-pie": "views/lemon-pie.html",
    "/tarta-banana": "views/tarta-banana.html",
    "/tarta-coco": "views/tarta-coco.html",
    "/tarta-durazno": "views/tarta-durazno.html",
    "/tarta-ricota": "views/tarta-ricota.html",
    "/tarta-toffi": "views/tarta-toffi.html",

    "/cheesecake-frutos-rojos": "views/cheesecake-frutos-rojos.html",
    "/cheesecake-frutilla": "views/cheesecake-frutilla.html",
    "/cheesecake-ddl": "views/cheesecake-ddl.html"
};

async function cargarVista() {
    const hash = location.hash || "#/";
    const ruta = hash.replace("#", "");
    const archivo = routes[ruta] || routes["/"];

    try {
        const respuesta = await fetch(archivo);

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar la vista");
        }

        app.innerHTML = await respuesta.text();

        window.scrollTo(0, 0);

        inicializarVista(ruta);

    } catch (error) {
        app.innerHTML = "<h2>Error al cargar la vista</h2>";
        console.error(error);
    }
}

function inicializarVista(ruta) {

    if (ruta === "/" || ruta === "/productos") {
        renderizarProductos();
    }

    if (ruta === "/alta") {
        inicializarFormularioAlta();
    }

    if (ruta === "/contacto") {
        inicializarFormularioContacto();
    }

    if (ruta === "/frambali") {
        inicializarFrambali();
    }
}

window.addEventListener("hashchange", cargarVista);
document.addEventListener("DOMContentLoaded", cargarVista);
