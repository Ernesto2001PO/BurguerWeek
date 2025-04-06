const { Restaurante, Hamburguesa, Calificacion } = require("./index");

// Relación: Una calificación pertenece a una hamburguesa
Calificacion.belongsTo(Hamburguesa, {
  foreignKey: "hamburguesa_id",
});

// Relación: Una hamburguesa tiene muchas calificaciones
Hamburguesa.hasMany(Calificacion, {
  foreignKey: "hamburguesa_id",
});

// Relación: Una hamburguesa pertenece a un restaurante
Hamburguesa.belongsTo(Restaurante, {
  foreignKey: "restaurante_id",
});

// Relación: Un restaurante tiene muchas hamburguesas
Restaurante.hasMany(Hamburguesa, {
  foreignKey: "restaurante_id",
});