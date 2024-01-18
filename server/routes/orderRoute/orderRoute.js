const express = require("express");
const { getAllOrders, getAllOrderByUser, getAllOrderCounts, placeOrder, getAllOrdersByStatus } = require("../../controlllers/orders/orderController.js");

const router = express.Router();

// GET || getting all blogs
router.get("/getAllOrders", getAllOrders);
router.get("/getAllOrderByUser/:userId", getAllOrderByUser);
router.get("/getOrderCount", getAllOrderCounts);
router.post("/placeOrder", placeOrder);
router.get("/getOrderByStatus/:orderStatus", getAllOrdersByStatus);


module.exports = router;
