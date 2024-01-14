const userModel = require("../../models/userModel/userModel.js");
const jwt = require('jsonwebtoken')

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
                userName,
                email,
                phone,
                role,
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
            message: error,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { phone, token, otp } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.otp == otp) {
            let user = await userModel.findOne({ phone })

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User is not registered"
                })
            }
            res.json({
                success: true,
                data: user,
                message: "User Login Successfully"
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Invalid OTP"
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

module.exports.sendOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000);

        // const snd = await twilioClient.messages.create({
        //     body: `Your OTP is ${otp}`,
        //     from: 'your_twilio_phone_number',
        //     to: phone
        // });
        if (true) {
            console.log(otp);
            const token = jwt.sign({ phone, otp }, process.env.JWT_SECRET);
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false, message: "Failed to send otp" });
        }
    } catch (error) {
        console.log(error.toString());
        res.json({ success: false, message: "Failed to send otp" });
    }
};

module.exports.verifyOtp = async (req, res) => {
    const { token, otp } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.otp == otp) {
            res.json({ success: true, message: 'OTP verified successfully' });
        } else {
            res.status(401).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, error: 'Invalid token' });
    }
};

module.exports.googleAuth = async (req, res) => {

};