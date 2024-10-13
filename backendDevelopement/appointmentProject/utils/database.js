const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("appointment-booking", "root", "HariBol@7745", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
