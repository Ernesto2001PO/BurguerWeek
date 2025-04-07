module.exports = (app) => {
    let router = require("express").Router();
    const controller = require("../controllers/calificacion.controller");

    // Rutas para calificaciones
    router.post("/calificaciones", controller.createCalificacion);

    app.use("/", router);
}

