const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Review = sequelize.define("review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pros: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cons: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Review;
