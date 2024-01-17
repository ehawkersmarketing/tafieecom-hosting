const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Types.ObjectId,
                    ref: "Product",
                },
                units: Number,
            },
        ],
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        orderStatus: {
            type: String,
            default: "Pending",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);