module.exports = (app) => {
    let router = require("express").Router();
    const controller = require("../controllers/admin.controller");

    router.get("/:section", controller.getSection);


    router.get("/", controller.getDashborad);
    router.get("/section/restaurantes", controller.mostrarRestaurantes);

    router.get("/section/restaurantesJSON", controller.mostrarRestaurantesJSON);


    router.get("/section/hamburguesas", controller.mostrarHamburguesas);
    router.get("/section/calificaciones", controller.mostrarCalificaciones);

    router.post("/create/restaurantes", controller.createRestaurantes);








    app.use("/admin", router);


}