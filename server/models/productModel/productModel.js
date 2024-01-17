const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
    },units:{
        minQuantity: {
            type:Number
        },
        maxQuantity:{
            type:Number
        }

    },
    metric: {
      type: String,
      // required: true,
    },
    companyName: {
      type: String,
      // require: [true, "companyName is required"],
    },

    categoryType: { type: mongoose.Types.ObjectId ,ref:'category' }
  },
    { timestamps: true } 
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
