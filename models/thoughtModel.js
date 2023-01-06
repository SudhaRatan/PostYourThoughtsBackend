const mongoose = require('mongoose')

const thoughtSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  imageData: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Thought', thoughtSchema)