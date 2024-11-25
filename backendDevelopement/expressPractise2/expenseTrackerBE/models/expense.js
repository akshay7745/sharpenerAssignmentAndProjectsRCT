const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
