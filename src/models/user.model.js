const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: [true, 'Please enter the email'] },
  username: { type: String, unique: true, required: [true, 'Please enter the username'] },
  password: { type: String, required: [true, 'Please enter the password'] },
  role: { type: String, default: 'member' },
  isActive: { type: Boolean, default: false }
}, { timestamps: true })

userSchema.index({ email: 1 })

module.exports = mongoose.model('Users', userSchema)
