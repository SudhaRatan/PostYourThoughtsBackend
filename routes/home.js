const express = require('express')
const router = express.Router()
const Thought = require('../models/thoughtModel')

router
  .route("/")
  .get(async (req, res) => {
    const userPosts = await Thought.find({anonymous: false},{imageData:0,password:0}).populate('authorId').sort({date:-1}).limit(20)
    // console.log(userPosts)
    res.json({ auth: true, posts: userPosts })
  })

router
  .route("/images/:id")
  .get(async (req,res) => {
    // console.log(req.params.id)
    const imageData = await Thought.findOne({_id:req.params.id},{imageData:1})
    // console.log(imageData)
    res.json(imageData)
  })

module.exports = router