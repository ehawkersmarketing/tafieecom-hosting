const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
