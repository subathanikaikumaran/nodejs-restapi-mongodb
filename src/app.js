const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
require('./config/database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  next()
})

app.use('/api', require('./routes/index'))
app.use(errorHandler)

app.use(function (req, res, next) {
  res.status(404).json({
    message: 'No such route exists'
  })
})

module.exports = app
