const mongoose = require('mongoose')
const { Schema } = mongoose

const userProfileSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
  firstName: { type: String, required: [true, 'Please enter the first name'] },
  lastName: { type: String, required: [true, 'Please enter the last name'] },
  phone: { type: Number, required: [true, 'Please enter the phone'] },
  address: { type: String, required: [true, 'Please enter the address'] },
  weight: { type: String, required: false, default: '0' },
  height: { type: String, required: false, default: '0' },
  remark: { type: String, required: false, default: '' },
  date: { type: Date, required: true, default: new Date() }
}, { timestamps: true })

module.exports = mongoose.model('UserProfile', userProfileSchema)
