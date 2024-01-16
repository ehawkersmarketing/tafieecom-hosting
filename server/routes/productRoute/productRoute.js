const express = require("express");
const {
  getAllProducts, createProduct , updateProduct , deleteProduct
} = require("../../controlllers/product/productController");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

// GET || getting all blogs
router.post("/createProduct",upload.single('image'),createProduct);
router.get("/allProducts", getAllProducts);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
