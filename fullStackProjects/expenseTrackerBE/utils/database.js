const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "HariBol@7745", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
