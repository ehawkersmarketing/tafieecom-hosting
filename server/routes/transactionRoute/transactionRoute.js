const express = require("express");
const {createTransaction,getLatestTransactionByUserId} = require("../../controlllers/transactionController/transactionController");

const router = express.Router();

router.post("/createTransaction", createTransaction);
router.get("/getLatestTransaction/:userId", getLatestTransactionByUserId);

module.exports = router;
