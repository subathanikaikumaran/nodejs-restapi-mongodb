const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.status(200).json('Root API')
})

router.use('/users', require('./userRoutes'))

module.exports = router
