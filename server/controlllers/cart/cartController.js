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
            break;
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
    const { userId, productId } = req.params;
    let userCart = await cartModel.findOne({ userId: userId });

    if (userCart) {
      let cart = await cartModel.findOne({
        "products.productId": productId,
        userId: userId,
      });
      if (cart) {
        cart = cart.toObject();
        for (var i = 0; i < cart.products.length; i++) {
          if (cart.products[i].productId == productId) {
            cart.products[i].units = cart.products[i].units - 1;
            if (cart.products[i].units == 0) {
              cart.products = cart.products.filter((item) => item.productId != productId)
            }
            break;
          }
        }
        const updatedCart = await cartModel.findOneAndUpdate(
          { userId: userId },
          { $set: { products: cart.products } },
          { new: true }
        );
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
    } else {
      res.status(500).send({
        success: false,
        message: "cart update failed",
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

exports.getCartByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ userId: userId }).populate('products.productId');
    if (cart) {
      res.status(200).json({
        success: true,
        data: cart,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting cart",
      error,
    });
  }
};