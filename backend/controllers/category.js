const Category = require('../models/category')
const slugify = require('slugify')
exports.create= (req, res) =>{
    const {name} = req.body
    let slug = slugify(name).toLowerCase()
    let category = new Category({name,slug})
    Category.findOne({slug}).exec((err,data)=>{
        if(data){
           return res.status(400).json({error:'Category is taken'});
        }
    })
    category.save((err,data) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(data)
    }) 
}

exports.list= (req,res)=>{
    Category.find({}).exec((err,data)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json(data)
    })
}
exports.read = (req,res)=>{
    const slug = req.params.slug.toLowerCase()
    Category.findOne({slug}).exec((err,data)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json(data)
    })
}

exports.remove = (req,res)=>{
    const slug = req.params.slug.toLowerCase()
    Category.findOneAndRemove({slug}).exec((err,data)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json({
            message: `${slug} category deleted`
        })
    })
}