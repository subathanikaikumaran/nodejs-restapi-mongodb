const asyncHandler = require('express-async-handler')
const Activity = require('../models/activity.model')
const commonProjection = require('../utils/projections')
/**
@admin admin
@desc Get all activities
@route GET /api/activities
@access private
*/

const getActivities = asyncHandler(async (req, res) => {
  const pageId = parseInt(req.body.pageId) || 1
  const pageSize = parseInt(req.body.pageSize) || 10

  // Calculate the skip value based on the page number and page size
  const skip = (pageId - 1) * pageSize

  // Find all activities with pagination
  const activities = await Activity.find({}, commonProjection).skip(skip).limit(pageSize)

  const activityCount = await Activity.countDocuments()
  const response = {
    count: activityCount,
    pageId,
    pageSize,
    arr: activities
  }
  return res.status(200).json(response)
})

/**
@admin admin
@desc Create new activity
@route POST /api/activities
@access private
*/

// const createMember = async (req, res) => {
//   try {
//     const { firstName, lastName, phone, address, weight, height, remark, regDate, subscriptionExpiration, subscriptionStatus } = req.body
//     if (!firstName || !lastName || !phone || !address) {
//       return res.status(400).json({ error: 'All fields are required!' })
//     }

//     const isPhoneExist = await Member.findOne({ phone })
//     if (isPhoneExist) {
//       return res.status(400).json({ error: 'Phone number already registered!' })
//     }

//     const token = randomValue(5)
//     console.log(token)

//     const newmember = await Member.create({ firstName, lastName, phone, address, weight, height, remark, token, regDate, subscriptionExpiration, subscriptionStatus })
//     return res.status(201).json(newmember)
//   } catch (err) {
//     console.error(err)
//     return res.status(500).json({ error: 'Server Error' })
//   }
// }

const createActivity = asyncHandler(async (req, res) => {
  const { name, type, duration, description } = req.body
  if (!name || !description) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const isActivityExist = await Activity.findOne({ name })
  if (isActivityExist) {
    res.status(400)
    throw new Error('The Activity already added!')
  }
  const newActivity = await Activity.create({ name, type, duration, description })
  return res.status(201).json({ _id: newActivity._id, status: true })
})

/**
@admin admin
@desc Get activity
@route GET /api/activities/:id
@access private
*/

const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id, commonProjection)
  if (!activity) {
    res.status(404)
    throw new Error('The Activity not found!')
  }
  return res.status(200).json(activity)
})

/**
@admin admin
@desc Update activity
@route PUT /api/activities/:id
@access private
*/

const updateActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id)
  const { name, description } = req.body
  if (!activity) {
    res.status(404)
    throw new Error('The Activity not found')
  }
  if (!name || !description) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const activityName = req.body.name
  if (activityName && activityName !== activity.name) {
    const isActivityExist = await Activity.findOne({ name })
    if (isActivityExist) {
      res.status(400)
      throw new Error('The Activity name can not duplicate!')
    }
  }

  const updatedActivity = await Activity.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  return res.status(200).json(updatedActivity)
})

/**
@admin admin
@desc Delete activity
@route DELETE /api/activities/:id
@access private
*/

const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id)
  if (!activity) {
    res.status(404)
    throw new Error('Activity not found')
  }

  await Activity.deleteOne({ _id: req.params.id })
  return res.status(200).json(activity)
})

module.exports = { getActivities, createActivity, getActivity, updateActivity, deleteActivity }
