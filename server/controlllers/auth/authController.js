const authModel = require("../../models/authModel/authModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  try {
    const { userName, email, password, phoneNumber } = req.body;
    const role = req.body.role || "user";

    if (!userName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        status: false,
        message: "Fill all details Properly",
      });
    }

    const emailAlreadyExist = await authModel.findOne({ email });
    if (emailAlreadyExist) {
      return res.status(400).json({
        status: false,
        message: "Email Already Exist",
      });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Error in hashing password while register",
      });
    }

    const newUser = new authModel({
      userName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    const user = await newUser.save();
    console.log(user)
    return res.status(200).json({
      status: true,
      message: "User Created Successfully ",
      user,
      role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Enter Email and password"
      })
    }

    let user = await authModel.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered"
      })
    }

    const payload = {
      email: user.email,
      role: user.role,
      id: user._id,
    }

    if (bcrypt.compare(password, user.password)) {
      console.log(bcrypt.compare(password, user.password))
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "20000h"
      })

      user = user.toObject()
      user.token = token
      delete user.password

      res.json({
        status: true,
        token, user,
        message: "User Login Successfully"
      })
      console.log(user)
    } else {
      return res.status(403).json({
        status: false,
        message: "password does not matched"
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: false,
      message: "error"
    })
  }
}
