module.exports = app => {
    let router =  require("express").Router();
    const controller = require("../controllers/restaurante.controller");


    router.get("/restaurante",controller.getRestaurantList);
    
    app.get("/ruta-ejemplo", (req, res) => {
        res.send("Ruta funcionando correctamente");
      });






}