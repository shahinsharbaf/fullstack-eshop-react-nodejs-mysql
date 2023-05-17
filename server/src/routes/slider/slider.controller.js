const db = require("../../db.js");

const sliderimages = (req, res) => {
  const q = "SELECT * FROM slider";
  db.query(q, (err, data) => {
    res.status(200).json(data);
  });
};

module.exports = { sliderimages };
