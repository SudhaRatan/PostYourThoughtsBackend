const express = require('express')
const router = express.Router()
const verifyJWT = require('../auth/auth')
const Thought = require("../models/thoughtModel")

router
  .route("/")
  .get(verifyJWT, async (req, res) => {
    res.json({ auth: true })
  })
  .post(verifyJWT, async (req, res) => {
    try {
      // console.log(req.body.post)
      const newThought = new Thought({
        title: req.body.post.title,
        description: req.body.post.description,
        imageData: req.body.image,
        authorId: req.userId
      })
      // console.log(newThought)
      const result = await newThought.save()
      // console.log(result)
      res.json({ stat: true })
    } catch (error) {
      console.log(error)
      res.json({ stat: false })
    }
  })

router
  .route("/your")
  .get(verifyJWT, async (req, res) => {
    const userPosts = await Thought.find({ authorId: req.userId }).populate('authorId')
    // console.log(userPosts)
    res.json({ auth: true, posts: userPosts })
  })

module.exports = router