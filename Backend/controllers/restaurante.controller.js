const db = require("../models/");

exports.getRestaurantList = async (req, res) => {
    try {
      const restaurantes = await db.Restaurante.findAll();
      res.status(200).json(restaurantes); // Enviar la lista de restaurantes como JSON
    } catch (error) {
      console.error("Error al obtener restaurantes:", error);
      res.status(500).json({ error: "Error al obtener restaurantes" });
    }
  };