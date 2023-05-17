const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "shahin2",
  password: "numlock",
  database: "eshop",
});

module.exports = db;
