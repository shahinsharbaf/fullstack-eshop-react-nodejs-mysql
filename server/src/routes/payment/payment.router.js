const express = require("express");

const { payment } = require("./payment.controller");

const router = express.Router();

router.post("/", payment);

module.exports = router;
