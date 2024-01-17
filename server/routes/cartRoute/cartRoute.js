const express = require("express");
const {
  putProductInCart,
  deleteProductInCart,
  // editProductUnits,
  getCart,
} = require("../../controlllers/cart/cartController");

const router = express.Router();

//PUT || add product route
router.put("/addToCart", putProductInCart);

//DELETE || delete product route
router.delete("/dropFromCart", deleteProductInCart);

//PUT || change units of a product
// router.put("/changeUnits", editProductUnits);

//GET || visit the cart page
router.get("/cart", getCart);

module.exports = router;
