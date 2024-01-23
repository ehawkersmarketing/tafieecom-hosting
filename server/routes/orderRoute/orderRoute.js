const express = require("express");
const {
  getAllOrders,
  getAllOrderByUser,
  getAllOrderCounts,
  placeOrder,
  getAllOrdersByStatus,
  getOrderById,
} = require("../../controlllers/orders/orderController.js");
const {
  ViewerRole,
  AdminRole,
  EditorRole,
} = require("../../middleware/role_check.js");

const router = express.Router();

// GET || getting all blogs
router.get("/getAllOrders", getAllOrders);
router.get("/getOrderById/:id", getOrderById);
router.get("/getAllOrderByUser/:userId", getAllOrderByUser);
router.get("/getOrderCount", getAllOrderCounts);
router.post("/placeOrder", EditorRole, placeOrder);
router.get("/getOrderByStatus/:orderStatus", getAllOrdersByStatus);

module.exports = router;
