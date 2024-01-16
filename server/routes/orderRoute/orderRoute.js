const express = require("express");
const { getAllOrders, getAllOrderByUser, getOrderCountOfProduct } = require("../../controlllers/Store/storeController");

const router = express.Router();

// GET || getting all blogs
router.get("/getAllOrders", getAllOrders);
router.get("/getAllOrderByUser/:uesrId", getAllOrderByUser);
router.get("/getOrderCount", getOrderCountOfProduct);


module.exports = router;
