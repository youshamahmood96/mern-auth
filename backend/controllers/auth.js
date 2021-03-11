const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
   User.findOne({email:req.body.email})
   .exec((err,data)=>{
       if(data){
          return res.status(400).json({error:'Email is taken'});
       }
       const {name,email,password} = req.body
       let username = shortId.generate()
       let profile = `${process.env.CLIENT_URL}/profile/${username}`
       let newUser = new User({name,email,password,profile,username})
      //  console.log(newUser,token);
       newUser.save((err,data)=>{
          if(err){
             return res.status(400).json({error:err})
          }
          const token = jwt.sign({_id:data._id},process.env.JWT_SECRET, {expiresIn:'1d'})
          res.json({
             data,token
          })
       }) 
   })
}

exports.signin=(req,res) => {
   const {email,password} = req.body
   User.findOne({email})
   .exec((err,data) => {
      if(err || !data){
         return res.status(400).json({error:'User doesnt Exist, Please Sign Up'});
      }
      if(!data.authenticate(password)){
         return res.status(400).json({error:'Email and Password doesnt match'});
      }
      const token = jwt.sign({_id:data._id},process.env.JWT_SECRET, {expiresIn:'1d'})
      res.cookie('token',token, {expiresIn:'1d'})
      const {_id,username,name,email,role} = data
      return res.json({
         token,data
      })
   })
}

exports.signout = (req,res) => {
   res.clearCookie('token')
   res.json({
      message:"Signed Out Successfully"
   }) 
}

exports.requireSignin = expressJwt({secret:process.env.JWT_SECRET,algorithms: ['HS256']})

exports.authMiddleware = (req,res,next) => {
   const authUserId = req.user._id
   User.findById({_id:authUserId}).exec((err,user) => {
      if(err || !user){
         return res.status(400).json({
            message:"User Not Found"
         })
      }
      req.profile = user
      next()
   })  
}

exports.adminMiddleware = (req,res,next) => {
   const adminUserId = req.user._id
   User.findById({_id:adminUserId}).exec((err,user) => {
      if(err || !user){
         return res.status(400).json({
            message:"User Not Found"
         })
      }
      if(user.role != 1){
         return res.status(400).json({
            message:"Admin only. Access denied"
         })
      }
      req.profile = user
      next()
   })  
}

