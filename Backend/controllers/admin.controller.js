const db = require("../models/");



exports.getDashborad = async (req, res) => {
    try {
        console.log("Obteniendo lista de restaurantes...");
        const restaurantes = await db.Restaurante.findAll();
        console.log("Restaurantes encontrados:", restaurantes);
        res.render("admin/admin", { restaurantes });
    }
    catch (error) {
        console.error("Error al obtener restaurantes:", error);
        res.status(500).json({ error: "Error al obtener restaurantes" });
    }
}





exports.getSection = async (req, res) => {
    const section = req.params.section;

    try {
        if (section === "restaurantes") {
            const restaurantes = await db.Restaurante.findAll();
            res.render("admin/restaurantes", { restaurantes, layout: false });
        } else if (section === "hamburguesas") {
            const hamburguesas = await db.Hamburguesa.findAll();
            res.render("admin/hamburguesas", { hamburguesas, layout: false });
        } else if (section === "calificaciones") {
            const calificaciones = await db.Calificacion.findAll();
            res.render("admin/calificaciones", { calificaciones, layout: false });
        } else {
            res.send("<p>Sección no encontrada</p>");
        }
    } catch (err) {
        res.send("<p>Error al cargar sección</p>");
    }
};


exports.mostrarRestaurantes = async (req, res) => {
    try {
        console.log("Obteniendo lista de restaurantes...");
        const restaurantes = await db.Restaurante.findAll();
        console.log("Restaurantes encontrados:", restaurantes);
        res.render("admin/restaurantes", { restaurantes });
    }
    catch (error) {
        console.error("Error al obtener restaurantes:", error);
        res.status(500).json({ error: "Error al obtener restaurantes" });
    }
}

exports.mostrarRestaurantesJSON = async (req, res) => {
    try {
        console.log("Obteniendo lista de restaurantes...");
        const restaurantes = await db.Restaurante.findAll();
        console.log("Restaurantes encontrados:", restaurantes);
        res.json(restaurantes);
    }
    catch (error) {
        console.error("Error al obtener restaurantes:", error);
        res.status(500).json({ error: "Error al obtener restaurantes" });
    }
}

exports.mostrarHamburguesas = async (req, res) => {
    try {
        console.log("Obteniendo lista de hamburguesas...");
        const hamburguesas = await db.Hamburguesa.findAll();
        console.log("Hamburguesas encontradas:", hamburguesas);
        res.render("admin/hamburguesas", { hamburguesas });
    }
    catch (error) {
        console.error("Error al obtener hamburguesas:", error);
        res.status(500).json({ error: "Error al obtener hamburguesas" });
    }
}
exports.mostrarCalificaciones = async (req, res) => {
    try {
        console.log("Obteniendo lista de calificaciones...");
        const calificaciones = await db.Calificacion.findAll();
        console.log("Calificaciones encontradas:", calificaciones);
        res.render("admin/calificaciones", { calificaciones });
    }
    catch (error) {
        console.error("Error al obtener calificaciones:", error);
        res.status(500).json({ error: "Error al obtener calificaciones" });
    }
}



exports.createRestaurantes = async (req, res) => {
    try {
        console.log("Creando nuevo restaurante...");
        const { nombre, logo } = req.body;
        const nuevoRestaurante = await db.Restaurante.create({
            nombre,
            logo,
        });
        console.log("Nuevo restaurante creado:", nuevoRestaurante);
        res.redirect("/admin/section/restaurantes");
    }
    catch (error) {
        console.error("Error al crear restaurante:", error);
        res.status(500).json({ error: "Error al crear restaurante" });
    }
}
