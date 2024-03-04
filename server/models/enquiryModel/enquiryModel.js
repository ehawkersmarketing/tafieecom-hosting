const mongoose = require("mongoose");

const enquiryModel = new mongoose.Schema({
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const enquirySchema = mongoose.model("enquiry", enquiryModel);
module.exports = enquirySchema;
