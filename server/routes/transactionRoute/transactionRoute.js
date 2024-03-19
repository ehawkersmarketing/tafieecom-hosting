const express = require("express");
const {createTransaction,getLatestTransactionByUserId,getTransactionByMerchantTransactionId} = require("../../controlllers/transactionController/transactionController");

const router = express.Router();

router.post("/createTransaction", createTransaction);
// router.get("/getLatestTransaction/:userId", getLatestTransactionByUserId);
// router.get("/transactions/:merchantTransactionId", getTransactionByMerchantTransactionId);

module.exports = router;
