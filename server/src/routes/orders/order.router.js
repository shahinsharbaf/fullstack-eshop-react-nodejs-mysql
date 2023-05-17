const express = require("express");
const { order } = require("./order.controller");

const router = express.Router();

router.post("/", order);

module.exports = router;
