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
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        transactionId: {
            type: String,
        },
        transactionStatus: {
            type: String,
            default: "PROCESSING",
        },
        orderStatus: {
            type: String,
            default: "PROCESSING",
        },
        amount: {
            type: Number,
        },
        userAddress: {
            type: mongoose.Types.ObjectId,
            ref: "UserAddress",
        },
        timestamps: {
            type: Date,
            default: Date.now(),
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);