const express = require('express');
const router = express.Router();
const passport = require('passport');

const { signup, login, sendOtp, verifyOtp, googleAuth } = require('../../controlllers/auth/authController')

router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login',
    })
);

router.post('/signup', signup);
router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/login', login);
router.post('/googleAuth', googleAuth)

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "Login failed",
    });
});

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.send(200).json({
            success: true,
            message: "Successfully LOGGED IN",
            user: req.user,
        });
    } else {
        res.send(403).json({
            success: false,
            message: "Login failed",
        });
    }
});

router.get('/google', passport.authenticate("google", ["profile", "email"]));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;