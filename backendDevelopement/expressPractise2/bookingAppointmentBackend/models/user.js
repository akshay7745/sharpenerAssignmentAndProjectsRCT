const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phonenumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = User;
