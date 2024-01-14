const passport = require('passport');
const cors = require('cors');
const express = require('express');
require('./mongodb/mongodb');
require('dotenv').config()
const PORT = process.env.PORT || 8080
const app = express()
const authRoute = require('./routes/authRoute/authRoute');
const cookieSession = require('cookie-session');
const userRoute = require("./routes/userRoute/userRoute");

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true
}));
app.use(
    cookieSession({
        name: "session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
// app.use('/api', productRoute);
// app.use('/api', userRoute);

app.listen(PORT, () => {
    console.log(`server is running on PORT => ${PORT}`)
})