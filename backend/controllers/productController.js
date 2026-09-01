const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../models/productModel");

// OBTENER TODOS LOS PRODUCTOS
const obtenerProductos = async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// OBTENER UN PRODUCTO POR ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await getProductById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// CREAR PRODUCTO
const crearProducto = async (req, res) => {
  try {
    const resultado = await createProduct(req.body);

    res.status(201).json({
      mensaje: "Producto creado correctamente",
      id: resultado.insertedId,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// ACTUALIZAR PRODUCTO
const actualizarProducto = async (req, res) => {
  try {
    const resultado = await updateProduct(req.params.id, req.body);

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({
      mensaje: "Producto actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// ELIMINAR PRODUCTO
const eliminarProducto = async (req, res) => {
  try {
    const resultado = await deleteProduct(req.params.id);

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};