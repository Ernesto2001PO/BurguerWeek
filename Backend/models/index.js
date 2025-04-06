const { sequelize } = require("../config/bd.config");

const Restaurante = require("./restaurante")(sequelize);
const Hamburguesa = require("./hamburguesa")(sequelize);
const Calificacion = require("./calificacion")(sequelize);

module.exports = {
  Restaurante,
  Hamburguesa,
  Calificacion,
  sequelize,
};

// una calificacion pertenece a una hamburguesa
Calificacion.belongsTo(Hamburguesa, {
  foreignKey: "hamburguesa_id",
  sourceKey: "id_hamburguesa",
});

// una hamburguesa tiene muchas calificaciones
Hamburguesa.hasMany(Calificacion, {
  foreignKey: "hamburguesa_id",
  targetKey: "id_hamburguesa",
});

// Una hamburguesa pertenece a un restaurante
Hamburguesa.belongsTo(Restaurante, {
  foreignKey: "restaurante_id",
  sourceKey: "id_restaurant",
});

// Un restaurante tiene muchas hamburguesas
Restaurante.hasMany(Hamburguesa, {
  foreignKey: "restaurante_id",
  targetKey: "id_restaurant",
});
