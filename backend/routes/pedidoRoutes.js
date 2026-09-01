const express = require("express");

const router = express.Router();

const { getDB } = require("../config/db");

// CREAR PEDIDO
router.post("/", async (req, res) => {
    try {
        const db = getDB();

        const pedido = {
            ...req.body,
            creadoEn: new Date()
        };

        const resultado = await db
            .collection("pedidos")
            .insertOne(pedido);

        res.status(201).json({
            mensaje: "Pedido guardado correctamente",
            id: resultado.insertedId
        });

    } catch (error) {
        console.error("Error al guardar pedido:", error);

        res.status(500).json({
            mensaje: "Error al guardar el pedido"
        });
    }
});

module.exports = router;