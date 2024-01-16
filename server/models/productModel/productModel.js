const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        // require: [true, 'title is required'],
    },
    description: {
        type: String,
        // require: [true, "description is required"],
    },
    image: {
        type: String,
        // require: [true, "image is required"],
    },
    price: {
        type: Number,
        // require: [true, "price is required"],
    },
    quantity: {
        type: Number,
        // require: [true, "quantity is required"],
    },
    metric: {
        type: String,
        // required: true,
    },
    companyName: {
        type: String,
        // require: [true, "companyName is required"],
    },
    productType: [{ type: String }]
},
    { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;