const db = require("../../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user already exist");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];
    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }

      return res.status(200).json("user has been created");
    });
  });
};

const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email=?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("user not found");
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json("wrong username or password");
    }

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    process.env.TOKEN = token;

    const { password, ...other } = data[0];
    res
      .cookie(
        "access_token",
        token
        // , {
        //   httpOnly: true,
        // }
      )
      .status(200)
      .json(other);
  });
};

const logout = (req, res) => {
  process.env.TOKEN = "";
  res
    .clearCookie("access_token", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .json("logout successfuly");
};

module.exports = { register, login, logout };
