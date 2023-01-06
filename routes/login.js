const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//Import model
const User = require('../models/userModel')

router
  .route("/")
  .get((req, res) => {
    res.send("Login get route")
  })
  .post(async (req, res) => {
    try {
      // console.log("req received")
      const user = await User.findOne({ username: req.body.username })
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: 60 * 60,
          })
          req.user = user._id
          res.json({ auth: true, token: token, user: user._id })
        } else {
          res.send("Incorrect password")
        }
      } else {
        res.send("User not found")
      }
    } catch (error) {
      console.log(error)
    }
  })

// Signup Route
router
  .route("/signup")
  .get((req, res) => {
    res.send("Signup Get")
  })
  .post(async (req, res) => {
    try {
      const pass = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        username: req.body.username,
        password: pass,
      })

      const user = await User.findOne({ username: newUser.username })
      if (user) {
        res.json({ error: "User already exists", status: false })
      } else {
        const result = await newUser.save()
        res.json({ status: true })
      }

    } catch (error) {
      console.log(error)
      res.json({ error: "Fill all fields" })
    }
  })

module.exports = router