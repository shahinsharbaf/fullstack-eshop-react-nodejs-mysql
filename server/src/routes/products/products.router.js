const db = require("../../db.js");
const express = require("express");

const { addProducts, uplaod } = require("./addProducts.controller");
const { deleteProduct } = require("./deleteProduct.controller");
const { viewProducts } = require("./viewProducts.controller");
const { viewProductspost } = require("./viewProductPost.controller");

const router = express.Router();

router.get("/view", viewProducts);
router.post("/view", viewProductspost);

router.post("/add", uplaod, addProducts);
router.delete("/delete", deleteProduct);

module.exports = router;
