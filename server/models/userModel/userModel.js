const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Types.ObjectId,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
