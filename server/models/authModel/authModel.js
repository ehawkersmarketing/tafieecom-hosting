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
  phone: {
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
});

const AuthModel = mongoose.model("User", AuthSchema);
module.exports = AuthModel;
