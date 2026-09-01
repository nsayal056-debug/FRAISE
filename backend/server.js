const { connectDB } = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");

console.log("productRoutes cargado");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/productos", productRoutes);
app.use("/api/carrito", pedidoRoutes);

console.log("Ruta /api/productos montada");
console.log("Ruta /api/carrito montada");

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Servidor FRAISE funcionando");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});