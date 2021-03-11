const express = require('express')
const router = express.Router()
const { create,list,read,remove } = require('../controllers/category')
const {runValidation} = require('../validators')
const {categoryValidator} = require('../validators/category')
const {requireSignin,adminMiddleware} = require('../controllers/auth')

//Routers

router.post('/category',categoryValidator,runValidation,requireSignin,adminMiddleware,create)
router.get('/categories',list)
router.get('/category/:slug',read)
router.delete('/category/:slug',requireSignin,adminMiddleware,remove)


//tes
module.exports = router