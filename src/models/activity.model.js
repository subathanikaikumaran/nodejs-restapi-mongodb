const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, default: 'Common' },
  duration: { type: Number, required: true, default: 0 },
  description: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Activity', activitySchema)
