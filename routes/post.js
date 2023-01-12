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
        authorId: req.userId,
        anonymous: req.body.check
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
    const userPosts = await Thought.find({ authorId: req.userId }).populate('authorId').sort({date:-1})
    // console.log(userPosts)
    res.json({ auth: true, posts: userPosts })
  })

router
  .route("/your/:id")
  .get(verifyJWT,async(req,res) => {
    try {
      const thought = await Thought.findById(req.params.id)
      res.json({thought})
    } catch (error) {
      console.log(error)
    }
  })
  .delete(verifyJWT, async (req, res) => {
    // const id = req.body.id
    // console.log(req.params.id)
    try {
      await Thought.findByIdAndDelete(req.params.id)
        .then((result) => {
          // console.log("Deleted")
          res.json({stat:true})
        })

    } catch (error) {
      console.log(error)
    }
  })
  .put(verifyJWT,async(req,res) => {
    // console.log(req.params.id)
    let thought
    try {
      thought = await Thought.findById(req.params.id)
      thought.title= req.body.post.title,
      thought.description= req.body.post.description,
      thought.imageData= req.body.image,
      thought.authorId= req.userId
      thought.anonymous = req.body.check
      await thought.save()
      res.json({ stat: true })
    } catch (error) {
      console.log(error)
    }
    
  })

module.exports = router