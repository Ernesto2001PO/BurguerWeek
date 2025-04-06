const { DataTypes } = require("sequelize");
const Restaurante = require("./restaurante");

module.exports = function (sequelize) {
  const Hamburguesa = sequelize.define(
    "hamburguesa",
    {
      id_hamburguesa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      restaurante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Hamburguesa;
};
