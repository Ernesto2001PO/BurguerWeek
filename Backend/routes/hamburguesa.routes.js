module.exports = (app) => {
    let router = require("express").Router();
    const controller = require("../controllers/hamburguesa.controller");

    // Rutas para hamburguesas
    router.get("/hamburguesa/:id", controller.getHamburguesabyId);



    app.use("/", router);

}