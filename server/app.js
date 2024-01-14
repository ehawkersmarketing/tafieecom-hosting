const express = require('express');
require('./mongodb/mongodb')
require('dotenv').config()
const PORT = process.env.PORT || 8080
const app = express()
const authRoute = require('./routes/authRoute/authRoute')

app.use(express.json())

app.use('/api/v1' , authRoute);


app.listen(process.env.PORT, () => {
    console.log(`server is running on PORT => ${PORT}`)
})