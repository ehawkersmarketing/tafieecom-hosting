const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    trim: true,
  },
  merchantTransactionId:{
    type:String
  },
  shippmentCharges:{
    type:String
  },
  merchantUserId:{
    type:String
  },
  refundTransactionId: {
    type: String,
    trim: true,
    default: "",
  },
  refundMerchantTransactionId:{
      type:String
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  cartId: {
    type: mongoose.Types.ObjectId,
    ref: "Cart",
    default: new mongoose.Types.ObjectId("65a1077e2d86e257edce492c"), //change this by taking out the default
  },
});

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;
