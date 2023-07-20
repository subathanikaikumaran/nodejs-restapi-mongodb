const express = require('express')
const router = express.Router()
const { loginUser, registerUser, currentUser } = require('../controllers/auth.controller')
const validateToken = require('../middlewares/validateTokenHandler')

router.get('/login', loginUser)
router.post('/users/register', registerUser)
router.get('/users/current', validateToken, currentUser)

module.exports = router
