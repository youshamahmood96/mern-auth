const Tag = require('../models/tag')
const slugify = require('slugify')
exports.create= (req, res) =>{
    const {name} = req.body
    let slug = slugify(name).toLowerCase()
    let tag = new Tag({name,slug})
    Tag.findOne({slug}).exec((err,data)=>{
        if(data){
           return res.status(400).json({error:'Tag is taken'});
        }
    })
    tag.save((err,data) =>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(data)
    }) 
}

exports.list= (req,res)=>{
    Tag.find({}).exec((err,data)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json(data)
    })
}
exports.read = (req,res)=>{
    const slug = req.params.slug.toLowerCase()
    Tag.findOne({slug}).exec((err,data)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json(data)
    })
}

exports.remove = (req,res)=>{
    const slug = req.params.slug.toLowerCase()
    Tag.findOneAndRemove({slug}).exec((err,data)=>{
        if(err){
            return res.status(400).json(err)
        }
        res.json({
            message: `${slug} Tag deleted`
        })
    })
}