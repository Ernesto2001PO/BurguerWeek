const db = require("../models/");


exports.getHamburguesaList = async (req, res) => {
  try {
    console.log("Obteniendo lista de hamburguesas...");
    const hamburguesas = await db.Hamburguesa.findAll();
    console.log("Hamburguesas encontradas:", hamburguesas);
    res.status(200).json(hamburguesas);
  } catch (error) {
    console.error("Error al obtener hamburguesas:", error);
    res.status(500).json({ error: "Error al obtener hamburguesas" });
  }
}
exports.getHamburguesaById = async (req, res) => {
  const id = req.params.id;
  try {
    console.log("Obteniendo hamburguesa por ID...");
    const hamburguesa = await db.Hamburguesa.findByPk(id);
    if (!hamburguesa) {
      return res.status(404).json({ error: "Hamburguesa no encontrada" });
    }
    console.log("Hamburguesa encontrada:", hamburguesa);
    res.status(200).json(hamburguesa);
  } catch (error) {
    console.error("Error al obtener hamburguesa:", error);
    res.status(500).json({ error: "Erroexports.r al obtener hamburguesa" });
  }
}
