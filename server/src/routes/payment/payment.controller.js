const db = require("../../db.js");
let flag = true;
let q;
const payment = (req, res) => {
  if (process.env.TOKEN != req.body.token) {
    return res.status(403).json("not permision");
  }

  req.body.cartItems.map((item) => {
    let q = "SELECT count FROM products WHERE id=?";
    db.query(q, item.id, (err, data) => {
      if (data[0].count < item.cartQuantity) {
        flag = false;
        return res.status(400).json("tedad mojud nist");
      }
    });
  });

  if (flag) {
    const mydate = Date.now();
    req.body.cartItems.map((item) => {
      q = "SELECT count FROM products WHERE id=?";
      db.query(q, item.id, (err, data) => {
        let newcount = data[0].count - item.cartQuantity;

        q = `UPDATE products SET count=? WHERE id=?`;
        db.query(q, [newcount, item.id]);
        q =
          "INSERT INTO orders(`userid`,`productid`,`productcount`,`date`) VALUES (?,?,?,?)";
        db.query(q, [
          req.body.currentUser.currentUser.id,
          item.id,
          item.cartQuantity,
          mydate,
        ]);
      });
    });
    return res.status(200).json("Paymentisok");
  }
};

module.exports = { payment };
