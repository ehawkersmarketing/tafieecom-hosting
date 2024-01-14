const userModel = require("../../models/userModel/userModel");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { userName, email, phone, role } = req.body;

    const phoneAlreadtExist = await userModel.findOne({ phone });
    if (phoneAlreadtExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    let newUser;
    if (role) {
      newUser = new userModel({
        userName: userName,
        email: email,
        phone: phone,
        role: role
      });
    } else {
      newUser = new userModel({
        userName,
        email,
        phone,
      });
    }
    const user = await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User Created Successfully ",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.toString(),
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, token, otp } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.otp == otp) {
      const user = await userModel.findOne({ phone: phone });
      if (user) {
        res.json({ success: true, message: "User Login successfully", data: user })
      } else {
        res.status(401).json({ success: false, error: 'User not present' });
      }
    } else {
      res.status(401).json({ success: false, error: 'Invalid OTP' });
    }
    let user = await userModel.findOne({ phone });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered"
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "error"
    })
  }
}

module.exports.sendOtp = async (req, res, next) => {
  try {
    const phoneNumber = req.body.phone;
    const otp = Math.floor(100000 + Math.random() * 900000);

    // const snd = await twilioClient.messages.create({
    //   body: `Your OTP is ${otp}`,
    //   from: 'your_twilio_phone_number',
    //   to: phoneNumber
    // });

    if (snd) {
      const token = jwt.sign({ phoneNumber, otp }, process.env.JWT_SECRET);
      res.json({ success: true, messaage: "OTP Sent successfully", token: token });
    } else {
      res.json({ success: false, message: "Failed to send OTP" });

    }
  } catch (error) {
    console.log(error.toString());
    next();
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { token, otp } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.otp == otp) {
      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid OTP' });
    }

  } catch (error) {
    console.log(error.toString());
    res.status(401).json({ success: false, error: 'Failed to validate otp' });
  }
};