const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: [true, 'Please enter the email'] },
  username: { type: String, unique: true, required: [true, 'Please enter the username'] },
  password: { type: String, required: [true, 'Please enter the password'] }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
