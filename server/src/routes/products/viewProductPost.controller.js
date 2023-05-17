const db = require("../../db.js");

const viewProductspost = (req, res) => {
  const q = `SELECT * FROM products WHERE id=${req.body.id}`;
  db.query(q, (err, data) => {
    err ? res.status(401).json(err) : res.status(200).json(data);
  });
};

module.exports = { viewProductspost };
