const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  const Restaurante = sequelize.define(
    "restaurante",
    {
      id_restaurant: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true, 
      timestamps: false,
    }
  );
  return Restaurante;
};
