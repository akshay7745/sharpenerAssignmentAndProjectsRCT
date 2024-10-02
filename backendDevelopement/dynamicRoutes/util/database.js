const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-projects",
  password: "HariBol@7745",
});

module.exports = pool.promise();
