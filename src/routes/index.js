const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  return res.status(200).json('Root API')
})

router.use('/users', require('./users'))
router.use('/members', require('./members'))
router.use('/auth', require('./auth'))

module.exports = router
