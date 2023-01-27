const express = require('express')
const router = express.Router()
const Thought = require('../models/thoughtModel')

router
  .route("/:page")
  .get(async (req, res) => {
    const page = req.params.page
    const userPosts = await Thought.find({anonymous: false},{imageData:0,password:0}).populate('authorId').sort({date:-1}).skip(page*10).limit(10)
    // console.log(userPosts.length)
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