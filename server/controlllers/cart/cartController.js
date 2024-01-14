const express = require("express");

//cartModel productId array

//adding product in cart
const app = express();
exports.putProductInCart = async (req, res) => {
  try {
    const { userId, productId, units } = req.body;
    // const cart = await cartModel.findByIdAndUpdate(
    //   userId,
    //   { $addToSet: { products: { productId, units } } },
    //   { new: true }
    // );

    res.status(200).send({
      success: true,
      message: "cart updated",
      productId,
      units,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "cart update failed",
    });
  }
};

//deleteing product from cart
exports.deleteProductInCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    // const cart = await cartModel.findByIdAndUpdate(
    //   userId,
    //   { $pull: { products: { productId } } },
    //   { new: true }
    // );
    res.status(200).send({
      success: true,
      message: "product deleted from cart",
      productId,
      userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "product deletion from cart failed",
    });
  }
};
