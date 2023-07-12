const express = require('express')
const router = express.Router()
const { getUsers, getCount, createUser, updateUser, getUser, deleteUser } = require('../controllers/userController')

router.route('/').get(getUsers).get(getCount).post(createUser)
router.route('/count').get(getCount)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router
