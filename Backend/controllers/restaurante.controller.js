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

exports.getRestaurantById = async (req, res) => {
  const id = req.params.id; 
  try {
    console.log("Obteniendo restaurante por ID...");
    const restaurante = await db.Restaurante.findByPk(id);

    if (!restaurante) {
      return res.status(404).json({ error: "Restaurante no encontrado" });
    }

    // Obtén las hamburguesas asociadas al restaurante
    const hamburguesas = await db.Hamburguesa.findAll({
      where: { restaurante_id: id },
    });

    console.log("Restaurante encontrado:", restaurante);
    console.log("Hamburguesas encontradas:", hamburguesas);

    res.render("restaurante", { restaurante, hamburguesas });
  } catch (error) {
    console.error("Error al obtener restaurante:", error);
    res.status(500).json({ error: "Error al obtener restaurante" });
  }
};



