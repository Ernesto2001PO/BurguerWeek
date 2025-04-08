const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 4000;
const db = require("./Backend/models/");

// Importo las relaciones
require("./Backend/models/relation");

// Establecer EJS como motor de plantillas
app.set("view engine", "ejs");

// Configuración de las vistas 
app.set("views", path.join(__dirname, "Frontend", "pages", "views"));




// Middleware para parsear datos del cuerpo
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Servir archivos estáticos (CSS y JS)
app.use("/css",express.static(path.join(__dirname, "Frontend", "public", "css")));
app.use("/js",express.static(path.join(__dirname, "Frontend", "public", "js")));
app.use("/images",express.static(path.join(__dirname, "Frontend", "public", "images")));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));




db.sequelize.sync({
    force: false,
  }).then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

require("./Backend/routes")(app);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
