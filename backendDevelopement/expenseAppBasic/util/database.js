const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("databasename", "user", "password", {
//   dialect: "mysql",
//   host: "localhost",
// });
const sequelize = new Sequelize("expense-app-basic", "root", "HariBol@7745", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
