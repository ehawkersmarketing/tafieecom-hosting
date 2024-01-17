const express = require("express");
const cartModel = require("../../models/cartModel/cartModel.js");

const app = express();

exports.putProductInCart = async (req, res) => {
  try {
    const { userId, productId, units } = req.body;
    let userCart = await cartModel.findOne({ userId: userId });

    if (userCart) {
      let product = await cartModel.findOne({
        "products.productId": productId,
        userId: userId,
      });
      if (product) {
        product = product.toObject();
        for (var i = 0; i < product.products.length; i++) {
          if (product.products[i].productId == productId) {
            product.products[i].units = product.products[i].units + 1;
          }
        }
        const updatedCart = await cartModel.findOneAndUpdate(
          { userId: userId },
          { $set: { products: product.products } },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "cart updated",
          data: updatedCart,
        });
      } else {
        userCart = userCart.toObject();
        userCart.products.push({ productId, units });
        const updatedCart = await cartModel.findOneAndUpdate(
          { userId: userId },
          { $set: { products: userCart.products } },
          { new: true }
        );
        if (updatedCart) {
          res.status(200).send({
            success: true,
            message: "cart updated",
            data: updatedCart,
          });
        } else {
          res.status(500).send({
            success: false,
            message: "cart update failed",
          });
        }
      }
    } else {
      const cart = new cartModel({
        userId: userId,
        products: [{ productId, units }],
      });
      await cart.save();
      res.status(200).send({
        success: true,
        message: "cart updated",
        productId,
        units,
      });
    }
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
    const cart = await cartModel.findByIdAndUpdate(
      userId,
      { $pull: { products: { productId } } },
      { new: true }
    );
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

//for getting the details of the cart
exports.getCart = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "getting cart",
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      success: false,
      message: "get cart failed",
    });
  }
};
