const mongoose = require('mongoose')
const { Schema } = mongoose

const userActivitySchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  taskId: { type: Schema.Types.ObjectId, ref: 'Activity' },
  duration: { type: String, required: true },
  startDate: { type: Date, required: true, default: new Date() },
  endDate: { type: Date, required: true },
  note: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('UserActivity', userActivitySchema)
