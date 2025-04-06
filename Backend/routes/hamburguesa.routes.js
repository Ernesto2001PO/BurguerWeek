module.exports = (app) => {
    let router = require("express").Router();
    const controller = require("../controllers/hamburguesa.controller");

    // Rutas para hamburguesas
    router.get("/hamburguesas", controller.getHamburguesaList);
    router.get("/hamburguesas/:id", controller.getHamburguesaById);


    app.use("/", router);

}