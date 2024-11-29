const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "attendance_management",
  "root",
  "HariBol@7745",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;
