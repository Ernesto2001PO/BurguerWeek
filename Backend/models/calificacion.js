const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Calificacion = sequelize.define(
    "calificacion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      hamburguesa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      probada: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Calificacion;
};
