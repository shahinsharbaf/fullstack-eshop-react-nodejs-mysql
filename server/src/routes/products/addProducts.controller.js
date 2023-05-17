const db = require("../../db.js");
const multer = require("multer");
const path = require("path");

const addProducts = (req, res) => {
  // if (process.env.TOKEN != req.body.token) {
  //   return res.status(403).json("not permision");
  // }
  const q =
    "INSERT INTO products(`name`,`imageurl`,`price`,`category`,`brand`,`count`) VALUES (?,?,?,?,?,?)";
  db.query(
    q,
    [
      req.body.name,
      req.file.filename,
      req.body.price,
      req.body.categories,
      req.body.brand,
      req.body.count,
    ],
    (err, data) => {
      err ? res.status(401).json(err) : res.status(200).json(data);
    }
  );
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uplaod = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error");
  },
}).single("image");

module.exports = { addProducts, uplaod };
