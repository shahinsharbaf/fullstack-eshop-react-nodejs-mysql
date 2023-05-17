const db = require("../../db.js");

const deleteProduct = (req, res) => {
  console.log(req.body);
  if (process.env.TOKEN != req.body.token) {
    return res.status(403).json("not permision");
  }
  const q = "DELETE FROM products WHERE id=?";
  db.query(q, [req.body.id], (err, data) => {
    err ? res.status(401).json(err) : res.status(200).json(data);
  });
};

module.exports = { deleteProduct };
