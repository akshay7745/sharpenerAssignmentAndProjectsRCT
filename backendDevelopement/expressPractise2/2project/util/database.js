// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "practise",
//   password: "HariBol@7745",
// });

// module.exports = pool.promise();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("practise", "root", "HariBol@7745", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
