const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'Please enter the first name'] },
  lastName: { type: String, required: [true, 'Please enter the last name'] },
  email: { type: String, unique: true, required: [true, 'Please enter the email'] },
  username: { type: String, unique: true, required: [true, 'Please enter the username'] },
  password: { type: String, required: [true, 'Please enter the password'] },
  phone: { type: Number, required: [true, 'Please enter the phone'] },
  address: { type: String, required: [true, 'Please enter the address'] }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
