// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_projects",
//   password: "HariBol@7745",
// });

// module.exports = pool.promise();

const Sequelise = require("sequelize");

const sequelize = new Sequelise("node_projects", "root", "HariBol@7745", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
