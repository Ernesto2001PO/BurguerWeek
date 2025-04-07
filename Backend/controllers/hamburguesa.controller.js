const db = require("../models/");


exports.getHamburguesabyId = async (req, res) => {
    const id = req.params.id; 
    try {
        console.log("Obteniendo hamburguesa por ID...");
        const hamburguesa = await db.Hamburguesa.findByPk(id);

        if (!hamburguesa) {
            return res.status(404).json({ error: "Hamburguesa no encontrada" });
        }

        console.log("Hamburguesa encontrada:", hamburguesa);
        res.render("hamburguesa", { hamburguesa });
    } catch (error) {
        console.error("Error al obtener hamburguesa:", error);
        res.status(500).json({ error: "Error al obtener hamburguesa" });
    }
  
};


