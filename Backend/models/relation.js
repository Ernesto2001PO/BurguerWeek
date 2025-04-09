const { Restaurante, Hamburguesa, Calificacion } = require("./index");

// Relación: Una calificación pertenece a una hamburguesa
Calificacion.associate = (models) => {
  Calificacion.belongsTo(models.Hamburguesa, {
    foreignKey: "hamburguesa_id",
    as: "hamburguesa",
    onDelete: "CASCADE",
  });
};

// Relación: Una hamburguesa tiene muchas calificaciones
Hamburguesa.associate = (models) => {
  Hamburguesa.hasMany(models.Calificacion, {
    foreignKey: "hamburguesa_id",
    as: "calificaciones",
    onDelete: "CASCADE",
  });
};




// Relación: Una hamburguesa pertenece a un restaurante
Hamburguesa.belongsTo(Restaurante, {
  foreignKey: "restaurante_id",
});

// Relación: Un restaurante tiene muchas hamburguesas
Restaurante.hasMany(Hamburguesa, {
  foreignKey: "restaurante_id",
});