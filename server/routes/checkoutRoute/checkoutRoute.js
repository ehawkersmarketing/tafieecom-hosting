const express = require("express");
const {
  checkoutProcess,
} = require("../../controlllers/checkout/checkoutController");

const router = express.Router();

//POST|| checkout with products
router.post("/checkout", checkoutProcess);

module.exports = router;
