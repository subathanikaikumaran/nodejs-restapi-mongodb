const mongoose = require('mongoose')
require('dotenv').config()
let dbUrl = process.env.DB_URL
if (process.env.NODE_ENV === 'development') {
  dbUrl = process.env.DEV_DB_URL
}
module.exports = mongoose.connect(dbUrl).then(() => console.log('Connected to DB')).catch((err) => console.log(err))
