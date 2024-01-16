const express = require("express");
const {
  getAllProducts, createProduct , updateProduct , deleteProduct , CreateCategory
} = require("../../controlllers/product/productController");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

// GET || getting all blogs
router.post("/createProduct",upload.single('image'),createProduct);
router.get("/allProducts", getAllProducts);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

router.post("/createCategory",CreateCategory);




module.exports = router;
