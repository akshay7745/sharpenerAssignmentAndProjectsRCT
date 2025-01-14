const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Cart;
