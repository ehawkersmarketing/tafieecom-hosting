const mongoose = require("mongoose");
const productModel = require("./productModel");

const cartSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.Types.ObjectId, ref: "Product"}],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
