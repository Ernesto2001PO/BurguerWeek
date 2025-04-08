module.exports = (app) => {
  require("./restaurante.routes")(app);
  require("./hamburguesa.routes")(app);
  require("./calificacion.routes")(app);
  require("./admin.routes")(app);
};



