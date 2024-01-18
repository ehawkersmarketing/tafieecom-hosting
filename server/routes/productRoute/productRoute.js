const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  searchProductByCategory,
  getProductsById,
  CreateCategory,
  getAllCategory,
} = require("../../controlllers/product/productController");

const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.post("/uploadImage", upload.single("image"), (req, res) => {
  console.log(req.file.filename);
  res.json({
    success: true,
    message: "Image Uploaded Successfully",
    url: req.file.filename,
  });
});

router.post("/createProduct", createProduct);
router.get("/allProducts", getAllProducts);
router.get("/getProduct/:id", getProductsById);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.post("/searchProduct", searchProduct);
router.get("/searchProduct/:category", searchProductByCategory);
router.post("/createCategory", CreateCategory);
router.get("/allCategory", getAllCategory);

module.exports = router;
