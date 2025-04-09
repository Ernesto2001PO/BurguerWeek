const db = require("../models/");
const path = require("path");
const fs = require("fs");




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

exports.mostrarHamburguesas = async (req, res) => {
    try {
        console.log("Obteniendo lista de hamburguesas...");
        const restaurantes = await db.Restaurante.findAll();

        const hamburguesas = await db.Hamburguesa.findAll();
        console.log("Hamburguesas encontradas:", hamburguesas);
        res.render("admin/hamburguesas", { hamburguesas, restaurantes });
    }
    catch (error) {
        console.error("Error al obtener hamburguesas:", error);
        res.status(500).json({ error: "Error al obtener hamburguesas" });
    }
}

exports.mostrarCalificaciones = async (req, res) => {
    try {

        const [calificaciones] = await db.sequelize.query(`
            SELECT h.nombre AS nombre_hamburguesa, h.foto AS foto_hamburguesa, SUM(c.puntuacion) AS total_puntuacion
            FROM hamburguesa h
            JOIN calificacion c ON h.id_hamburguesa = c.hamburguesa_id
            GROUP BY h.nombre, h.foto;
        `);

        console.log("Calificaciones encontradas:", calificaciones);

        res.render("admin/calificaciones", { calificaciones });
    } catch (error) {
        console.error("Error al obtener calificaciones:", error);
        res.status(500).json({ error: "Error al obtener calificaciones" });
    }
};


exports.getCrearRestaurante = (req, res) => {
    res.render("admin/crear");
};

exports.postCrearRestaurante = async (req, res) => {
    let imagePath = null;

    try {
        const { nombre } = req.body;

        if (!req.files?.logo) {
            return res.render("admin/crear", {
                error: "Debe seleccionar una imagen",
                old: { nombre }
            });
        }

        const logoFile = req.files.logo;

        // Validar tipo de imagen
        const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validMimeTypes.includes(logoFile.mimetype)) {
            return res.render("admin/crear", {
                error: "Formato de imagen no válido. Use JPG, PNG o GIF",
                old: { nombre }
            });
        }

        const uploadDir = path.join(__dirname, "..", "..", "uploads");

        const imageName = `restaurante_${Date.now()}${path.extname(logoFile.name)}`;
        imagePath = path.join(uploadDir, imageName);
        const imageUrl = `uploads/${imageName}`;

        await logoFile.mv(imagePath);

        // Crear el restaurante con todos los datos
        const restaurante = await db.Restaurante.create({
            nombre,
            logo: imageUrl
        });

        console.log("✅ Restaurante creado exitosamente:", restaurante.toJSON());
        res.redirect("/admin");

    } catch (err) {
        console.error("❌ Error al crear restaurante:", err);

        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.render("admin/crear", {
            error: "Error al crear el restaurante. Por favor intente nuevamente.",
            old: req.body
        });
    }
};

exports.getEditarRestaurante = async (req, res) => {
    const restauranteId = req.params.id;
    try {
        const restaurante = await db.Restaurante.findByPk(restauranteId);
        if (!restaurante) {
            return res.status(404).send("Restaurante no encontrado");
        }

        res.render("admin/editarRestaurante", {
            restaurante: restaurante
        });
    } catch (err) {
        console.error("Error al obtener el restaurante:", err);
        res.status(500).send("Error al cargar los datos del restaurante");
    }
};
``
exports.postEditarRestaurante = async (req, res) => {
    try {
        const restauranteId = req.params.id;
        const { nombre, logo } = req.body;

        if (req.files && req.files.logo) {
            const logoFile = req.files.logo;
            const uploadDir = path.join(__dirname, "..", "..", "uploads");
            const imageName = `restaurante_${Date.now()}${path.extname(logoFile.name)}`;
            const imagePath = path.join(uploadDir, imageName);
            const imageUrl = `uploads/${imageName}`;

            await logoFile.mv(imagePath);

            await db.Restaurante.update(
                { nombre, logo: imageUrl },
                { where: { id_restaurant: restauranteId } }
            );
        } else {
            await db.Restaurante.update(
                { nombre },
                { where: { id_restaurant: restauranteId } }
            );
        }

        res.redirect("/admin");
    } catch (err) {
        console.error("Error al actualizar restaurante:", err);
        res.status(500).send("Error en el servidor");
    }
};

exports.deleteRestaurantes = async (req, res) => {
    const restauranteId = req.params.id;

    try {
        const restaurante = await db.Restaurante.findByPk(restauranteId);
        if (!restaurante) {
            return res.status(404).send("Restaurante no encontrado");
        }

        await db.Restaurante.destroy({ where: { id_restaurant: restauranteId } });


        console.log("Restaurante eliminado exitosamente");
        res.redirect("/admin");

    } catch (err) {
        console.error("Error al eliminar restaurante:", err);
        res.status(500).send("Error al eliminar el restaurante");
    }
}



exports.getCrearHamburguesa = async (req, res) => {
    try {
        const restaurantes = await db.Restaurante.findAll();
        const hamburguesas = await db.Hamburguesa.findAll();

        res.render("admin/crearHamburguesa", {
            restaurantes: restaurantes,
            hamburguesa: hamburguesas
        });
    } catch (err) {
        console.error("Error al obtener restaurantes:", err);
        res.status(500).send("Error al cargar la página de creación de hamburguesa");
    }
};



exports.postCrearHamburguesa = async (req, res) => {
    let imagePath = null;

    try {
        const { nombre, precio, descripcion, id_restaurant } = req.body;

        if (!req.files?.foto) {
            return res.render("admin/crearHamburguesa", {
                error: "Debe seleccionar una imagen",
                old: { nombre, precio, descripcion }
            });
        }

        const fotoFile = req.files.foto;

        // Validar tipo de imagen
        const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validMimeTypes.includes(fotoFile.mimetype)) {
            return res.render("admin/crearHamburguesa", {
                error: "Formato de imagen no válido. Use JPG, PNG o GIF",
                old: { nombre, precio, descripcion }
            });
        }

        const uploadDir = path.join(__dirname, "..", "..", "uploads");

        const imageName = `hamburguesa_${Date.now()}${path.extname(fotoFile.name)}`;
        imagePath = path.join(uploadDir, imageName);
        const imageUrl = `uploads/${imageName}`;

        await fotoFile.mv(imagePath);

        // Crear la hamburguesa con todos los datos
        const hamburguesa = await db.Hamburguesa.create({
            nombre,
            precio,
            descripcion,
            foto: imageUrl,
            restaurante_id: id_restaurant
        });

        console.log("✅ Hamburguesa creada exitosamente:", hamburguesa.toJSON());
        res.redirect("/admin");

    } catch (err) {
        console.error("❌ Error al crear hamburguesa:", err);

        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.render("admin/crearHamburguesa", {
            error: "Error al crear la hamburguesa. Por favor intente nuevamente.",
            old: req.body
        });
    }
}
exports.getEditarHamburguesa = async (req, res) => {


    const hamburguesaId = req.params.id;
    try {

        const restaurantes = await db.Restaurante.findAll();

        const hamburguesa = await db.Hamburguesa.findByPk(hamburguesaId);
        if (!hamburguesa) {
            return res.status(404).send("Restaurante no encontrado");
        }

        res.render("admin/editarHamburguesa", {
            hamburguesa: hamburguesa,
            restaurantes: restaurantes
        });
    } catch (err) {
        console.error("Error al obtener el restaurante:", err);
        res.status(500).send("Error al cargar los datos del restaurante");
    }
};

exports.postEditarHamburguesa = async (req, res) => {
    try {
        const hamburguesaId = req.params.id;
        const { nombre, precio, descripcion, id_restaurant } = req.body;

        if (req.files && req.files.foto) {
            const fotoFile = req.files.foto;
            const uploadDir = path.join(__dirname, "..", "..", "uploads");
            const imageName = `hamburguesa_${Date.now()}${path.extname(fotoFile.name)}`;
            const imagePath = path.join(uploadDir, imageName);
            const imageUrl = `uploads/${imageName}`;

            await fotoFile.mv(imagePath);

            await db.Hamburguesa.update(
                { nombre, precio, descripcion, foto: imageUrl },
                { where: { id_hamburguesa: hamburguesaId } }
            );
        } else {
            await db.Hamburguesa.update(
                { nombre, precio, descripcion },
                { where: { id_hamburguesa: hamburguesaId } }
            );
        }

        res.redirect("/admin");
    } catch (err) {
        console.error("Error al actualizar hamburguesa:", err);
        res.status(500).send("Error en el servidor");
    }
}



exports.deleteHamburguesa = async (req, res) => {
    const hamburguesaId = req.params.id;

    try {
        const hamburguesa = await db.Hamburguesa.findByPk(hamburguesaId);
        if (!hamburguesa) {
            return res.status(404).send("Restaurante no encontrado");
        }

        await db.Calificacion.destroy({
            where: { hamburguesa_id: hamburguesaId },
        });


        await db.Hamburguesa.destroy({ where: { id_hamburguesa: hamburguesaId } });

        console.log("Hamburguesa eliminado exitosamente");
        res.redirect("/admin");

    } catch (err) {
        console.error("Error al eliminar hamburguesa:", err);
        res.status(500).send("Error al eliminar el hamburguesa");
    }
}






