module.exports = (app) => {
  let router = require("express").Router();
  const controller = require("../controllers/restaurante.controller");

  router.get("/", controller.getRestaurantList);
  router.get("/restaurantes", controller.getRestaurantListJSON);

  router.get("/ruta-ejemplo", (req, res) => {
    res.send("Ruta funcionando correctamente");
  });

  app.use("/", router);
};


