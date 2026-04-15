const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      default: 'user',
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
)

const conversationSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    patient: {
      name: { type: String, trim: true },
      disease: { type: String, trim: true },
      location: { type: String, trim: true },
      focus: { type: String, trim: true },
    },
    lastQuery: {
      type: String,
      trim: true,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Conversation', conversationSchema)
