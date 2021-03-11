const express = require('express')
const router = express.Router()
const {signup,signin,signout,requireSignin} = require('../controllers/auth')
const {userSignupValidator,userSigninValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

//Routers

router.post('/signup',userSignupValidator,runValidation,signup)

router.post('/signin',userSigninValidator,runValidation,signin)

router.get('/signout',signout)

//test

router.get('/secret',requireSignin,(req,res)=>{
    res.json({
        user:req.user
    })
})

module.exports = router