const express = require('express')
const router = express.Router()
const Thought = require('../models/thoughtModel')

router
  .route("/")
  .get(async (req, res) => {
    const userPosts = await Thought.find({anonymous: false}).populate('authorId').sort({date:-1}).limit(20)
    // console.log(userPosts)
    res.json({ auth: true, posts: userPosts })
  })

module.exports = router