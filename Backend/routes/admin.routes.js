module.exports = (app) => {
    let router = require("express").Router();
    const controller = require("../controllers/admin.controller");

    router.get("/:section", controller.getSection);


    router.get("/", controller.getDashborad);
    router.get("/section/restaurantes", controller.mostrarRestaurantes);
    router.get("/section/hamburguesas", controller.mostrarHamburguesas);
    router.get("/section/calificaciones", controller.mostrarCalificaciones);


    router.get("/restaurantes/crear", controller.getCrearRestaurante);
    router.post("/restaurantes/crear", controller.postCrearRestaurante);

    router.get("/restaurantes/editar/:id", controller.getEditarRestaurante);
    router.post("/restaurantes/editar/:id", controller.postEditarRestaurante);

    router.post("/restaurantes/eliminar/:id", controller.deleteRestaurantes);


    router.get("/hamburguesas/crear", controller.getCrearHamburguesa);
    router.post("/hamburguesas/crear", controller.postCrearHamburguesa);

    router.get("/hamburguesas/editar/:id", controller.getEditarHamburguesa);
    router.post("/hamburguesas/editar/:id", controller.postEditarRestaurante);




    app.use("/admin", router);


}