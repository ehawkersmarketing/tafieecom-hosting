const express = require("express");
const {
  putProductInCart,
  deleteProductInCart,
  getCartByUser,
} = require("../../controlllers/cart/cartController");

const router = express.Router();

//PUT || add product route
router.put("/addToCart", putProductInCart);

//DELETE || delete product route
router.delete("/dropFromCart", deleteProductInCart);

module.exports = router;
