module.exports = (app) => {
  let router = require("express").Router();
  const controller = require("../controllers/restaurante.controller");

  router.get("/", controller.getRestaurantList);
  router.get("/restaurant/:id", controller.getRestaurantById);
  


  // rutas JSON
  router.get("/restaurantes", controller.getRestaurantListJSON);


  app.use("/", router);
};



