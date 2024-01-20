const userAddressController = require("../../controlllers/user/userAddress");
const express = require("express");
const router = express.Router();

router.post("/putUserAddress", userAddressController.putUserAddress);

module.exports = router;