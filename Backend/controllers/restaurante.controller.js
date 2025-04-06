const db = require("../models/");

exports.getRestaurantList = async (req, res) => {
  try {
    console.log("Obteniendo lista de restaurantes...");
    const restaurantes = await db.Restaurante.findAll();
    console.log("Restaurantes encontrados:", restaurantes);
    res.render("index", { restaurantes });
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    res.status(500).json({ error: "Error al obtener restaurantes" });
  }
};


exports.getRestaurantListJSON = async (req, res) => {
  try {
    console.log("Obteniendo lista de restaurantes...");
    const restaurantes = await db.Restaurante.findAll();
    console.log("Restaurantes encontrados:", restaurantes);
    res.status(200).json(restaurantes);
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    res.status(500).json({ error: "Error al obtener restaurantes" });
  }
};


