const mongoose = require("mongoose");

const ServiceEnquiryModel = new mongoose.Schema({
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

const ServiceEnquirySchema = mongoose.model("serviceEnquiry", ServiceEnquiryModel);
module.exports = ServiceEnquirySchema;
