const express = require('express')
const router = express.Router()
const { getMembers, getMemberCount, createMember, getMember, updateMember, deleteMember, updateMemberUserStatus } = require('../controllers/member.controller')
const validateToken = require('../middlewares/validateTokenHandler')

router.use(validateToken)
router.route('/').get(getMembers).post(createMember)
router.route('/count').get(getMemberCount)
router.route('/:id').get(getMember).put(updateMember).delete(deleteMember)
router.route('/:id/status').put(updateMemberUserStatus)

module.exports = router
