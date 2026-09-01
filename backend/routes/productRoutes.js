const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Entró al router productos:", req.method, req.url);
  next();
});

const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productController");

// GET - Obtener todos los productos
router.get("/", obtenerProductos);

// GET - Obtener producto por ID
router.get("/:id", obtenerProductoPorId);

// POST - Crear producto
router.post("/", crearProducto);

// PUT - Actualizar producto
router.put("/:id", actualizarProducto);

// DELETE - Eliminar producto
router.delete("/:id", eliminarProducto);

module.exports = router;