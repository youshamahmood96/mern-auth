const express = require('express')
const router = express.Router()
const {requireSignin,authMiddleware,adminMiddleware} = require('../controllers/auth')
const { read } = require('../controllers/user')

//Routers

router.get('/profile',requireSignin,authMiddleware,read)

//tes
module.exports = router