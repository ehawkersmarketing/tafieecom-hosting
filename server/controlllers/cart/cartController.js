const express = require("express");

//cartModel productId array

//adding product in cart
const app = express();
exports.putProductInCart = async (req, res) => {
  try {
    const { userId, productId, units } = req.body;
    const product = await cartModel.findOne({
      "products.productId": productId,
      userId: userId,
    });

    cartModel.findOneAndUpdate(
      { "products.productId": productId, userId: userId },
      { $inc: { "products.$[elem].units": 1 } },
      { arrayFilters: [{ "elem.productId": productId }], new: true }
    );
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

exports.editProductUnits = async (req, res) => {
  try {
    // const { userId, productId, units } = req.body;
    // const cart = await cartModel.findByIdAndUpdate(
    //   userId,
    //   { $set: { "products.$[elem].units": newUnits } },
    //   { arrayFilters: [{ "elem.productId": productId }], new: true },
    //   { new: true }
    // );
    res.status(200).send({
      success: true,
      message: "cart updated",
      cart,
    });
  } catch (err) {
    response.status(500).send({
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

//showing the cart
exports.getCart = async (req, res) => {
  try {
    // const { userId } = req.body;
    // const cart = await cartModel.findOne({userId:userId});
    console.log("cart get req. recieved");
    res.status(200).send({
      success: true,
      message: "cart fetched",
      // cart,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "cart fetch failed",
    });
  }
};
