// const crypto = require("crypto");
const axios = require("axios");
const uniqid = require("uniqid");
const { setTimeout } = require("timers");
const { calcShipment } = require("../../controlllers/ship/shipController");
const express = require("express");

const router = express.Router();

router.post("/calcShipment", calcShipment);

module.exports = router;
