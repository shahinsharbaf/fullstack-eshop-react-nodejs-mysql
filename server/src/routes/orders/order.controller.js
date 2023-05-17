const db = require("../../db.js");

const order = (req, res) => {
  console.log(req.body);
  const q =
    "SELECT * FROM orders JOIN products ON orders.productid=products.id WHERE userid = ? ORDER BY date DESC";
  db.query(q, [req.body.id], (err, data) => {
    return res.status(200).json(data);
  });
  //  if (err) return res.json(err);
  //  if (data.length) return res.status(409).json("user already exist");
  //     const salt = bcrypt.genSaltSync(10);
  //     const hash = bcrypt.hashSync(req.body.password, salt);

  //     const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
  //     const values = [req.body.username, req.body.email, hash];
  //     db.query(q, [values], (err, data) => {
  //       if (err) {
  //         return res.json(err);
  //       }

  //       return res.status(200).json("user has been created");
  //     });
  //   });
};

module.exports = { order };
