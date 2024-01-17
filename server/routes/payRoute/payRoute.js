const express = require("express");
const {
  payFunction,
  checkStatusFunction,
} = require("../../controlllers/pay/payController");

const router = express.Router();

router.post("/phonePePayment", payFunction);

router.get("/checkStatus", checkStatusFunction);

module.exports = router;
