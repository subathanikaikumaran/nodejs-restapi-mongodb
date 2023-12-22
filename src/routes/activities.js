const express = require('express')
const router = express.Router()
const { getActivities, createActivity, getActivity, updateActivity, deleteActivity } = require('../controllers/activity.controller')
const validateToken = require('../middlewares/validateTokenHandler')
// validation
router.use(validateToken)
router.route('/').get(getActivities).post(createActivity)
router.route('/:id').get(getActivity).put(updateActivity).delete(deleteActivity)

module.exports = router
