const db = require("../../db.js");

const viewProducts = (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    err ? res.status(401).json(err) : res.status(200).json(data);
  });
};

module.exports = { viewProducts };
