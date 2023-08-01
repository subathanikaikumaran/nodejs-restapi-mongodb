const express = require('express')
const router = express.Router()
// const { getMyProfile, createMyProfile, updateMyProfile, getUserProfiles, getCountProfile, createUserProfile, updateUserProfile, getUserProfile, deleteUserProfile } = require('../controllers/member.controller')
const { getUsers, getCount, createUser, updateUser, getUser, deleteUser, getUserList, updateUserStatus } = require('../controllers/user.controller')
const validateToken = require('../middlewares/validateTokenHandler')

//  router.use(validateToken)
router.route('/list').get(getUserList)
router.route('/').get(getUsers).post(createUser)
router.route('/count').get(getCount)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/:id/status').put(updateUserStatus)

// router.route('/profile').get(getUserProfiles).post(createUserProfile)
// router.route('/profile/count').get(getCountProfile)
// router.route('/profile/:id').get(getUserProfile).put(updateUserProfile).delete(deleteUserProfile)
// router.route('/myProfile').get(getMyProfile).post(createMyProfile).put(updateMyProfile)

module.exports = router
