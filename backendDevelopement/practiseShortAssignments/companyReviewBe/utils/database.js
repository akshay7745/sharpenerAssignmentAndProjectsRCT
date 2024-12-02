const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("company_reviews", "root", "HariBol@7745", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
