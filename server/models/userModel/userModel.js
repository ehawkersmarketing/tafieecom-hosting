const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  DOB:{
    type:Date
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: "role",
    default: new mongoose.Types.ObjectId("65a1077e2d86e257edce492c"),
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
