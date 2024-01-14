const express = require('express')
const {getAllUsers} = require('../controller/userController/usersController')

const router = express.Router()

router.get('/all-products',getAllUsers);

module.exports = router;