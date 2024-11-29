const { DataTypes } = require("sequelize");

const sequelize = require("../utils/database");

const Attendance = sequelize.define("attendance", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  attendance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Attendance;
