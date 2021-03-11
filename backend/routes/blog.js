const express = require('express')
const router  = express.Router()

//Controllers
const {time} = require('../controllers/blog')

router.get('/',time)
module.exports = router