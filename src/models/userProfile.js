const mongoose = require('mongoose')
const { Schema } = mongoose

const userProfileSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  remark: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() }
}, { timestamps: true })

module.exports = mongoose.model('UserProfile', userProfileSchema)
