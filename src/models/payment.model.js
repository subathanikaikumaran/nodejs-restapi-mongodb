const mongoose = require('mongoose')
const { Schema } = mongoose

const paymentSchema = new mongoose.Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: { type: String, required: true },
  paymentDate: { type: Date, required: true, default: new Date() }
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)
