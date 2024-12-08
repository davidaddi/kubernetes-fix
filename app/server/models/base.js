const { Model, DataTypes } = require("sequelize");
const connection = require("./db");

class Base extends Model {}

Base.init(
  {
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize: connection,
    modelName: "Base",
  }
);

module.exports = Base;
