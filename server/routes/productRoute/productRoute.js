const express = require("express");
const {
  getAllProducts,
} = require("../../controlllers/product/productController");

const router = express.Router();

// GET || getting all blogs
router.get("/allproducts", getAllProducts);

module.exports = router;
