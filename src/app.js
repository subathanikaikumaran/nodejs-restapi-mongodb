const express = require('express')
const routes = require('./routes/index')
require('./config/database')

const app = express()
app.use('/api/auth', routes)
module.exports = app
