const express = require("express");
const cartModel = require("../../models/cartModel/cartModel.js");
const productModel = require("../../models/productModel/productModel.js");

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
        if (units == 0) {
          cartModel.deleteOne({ "products.productId": productId });
          res.status(200).send({
            success: true,
            message: "cart updated",
            data: {},
          });
        } else {
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
        }
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

exports.getCartByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ userId: userId });
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

/////////////////////////////////////////////////////////////////////////
exports.getAllProductsInCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.findOne({ userId: userId }).products;
    let totalWeight = 0;
    let totalPrice = 0;
    if (cart) {
      for (product in products) {
        totalWeight =
          totalWeight +
          productModel.findById(product.productId).weight * product.units;
        totalPrice =
          totalPrice +
          productModel.findById(product.productId).price * product.units;
      }
      res.status(200).json({
        success: true,
        products: cart.products,
        totalWeight: totalWeight,
        totalPrice: totalPrice,
        cartId: cart._id,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error in getting all products in cart",
    });
  }
};
//////////////////////////////////////////////////////////////////////////
