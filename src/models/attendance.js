const mongoose = require('mongoose')
const { Schema } = mongoose

const attendanceSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: Boolean, required: true, default: 1 },
  dateTime: { type: Date, required: true, default: new Date() }
}, { timestamps: true })

module.exports = mongoose.model('Attendance', attendanceSchema)
