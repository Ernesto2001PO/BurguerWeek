module.exports = (app) => {
  let router = require("express").Router();
  const controller = require("../controllers/restaurante.controller");

  router.get("/", controller.getRestaurantList);
  router.get("/restaurant/:id", controller.getRestaurantById);
  




  app.use("/", router);
};



