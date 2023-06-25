const express = require('express')
const router = express.Router()
const user = require('./user')

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  return res.status(200).json('Root API')
})
router.use('/user', user)
module.exports = router
