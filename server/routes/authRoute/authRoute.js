const express = require('express');
const router = express.Router()

const { signup, login, sendOtp, verifyOtp, googleAuth } = require('../../controlllers/auth/authController')


router.post('/signup', signup);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);
router.post('/googleAuth', googleAuth)

module.exports = router;