const mongoose = require('mongoose')
const { Schema } = mongoose

const userActivitySchema = new mongoose.Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'User' },
  activity: { type: Array, ref: 'Activity' },
  duration: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
  completed: { type: Boolean, default: false },
  notes: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Workouts', userActivitySchema)
