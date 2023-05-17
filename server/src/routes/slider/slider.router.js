const express = require("express");

const { sliderimages } = require("./slider.controller");

const router = express.Router();

router.get("/", sliderimages);

module.exports = router;
