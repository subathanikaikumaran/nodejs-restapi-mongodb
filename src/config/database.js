const mongoose = require('mongoose')
require('dotenv').config()
let dbUrl = process.env.DB_URL

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

if (process.env.NODE_ENV === 'development') {
  dbUrl = process.env.DEV_DB_URL
}

module.exports = mongoose.connect(dbUrl, options).then(() => console.log('Connected to DB')).catch((err) => console.log(err))
