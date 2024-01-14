const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  role: {
    type: mongoose.Types.ObjectId,
  },
  token: [
    {
      token: {
        type: String,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  }
});

const AuthModel = mongoose.model("user", AuthSchema);
module.exports = AuthModel;
