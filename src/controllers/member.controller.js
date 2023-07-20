const asyncHandler = require('express-async-handler')
const Member = require('../models/member.model')
const User = require('../models/user.model')
const { randomValue } = require('../utils/crypto')
const commonProjection = require('../utils/projections')
/**
@admin admin
@desc Get all members
@route GET /api/members
@access private
*/

const getMembers = asyncHandler(async (req, res) => {
  const pageId = parseInt(req.body.pageId) || 1
  const pageSize = parseInt(req.body.pageSize) || 10

  // Calculate the skip value based on the page number and page size
  const skip = (pageId - 1) * pageSize

  // Find all members with pagination
  const members = await Member.find({}, commonProjection).skip(skip).limit(pageSize)

  const memberCount = await Member.countDocuments()
  const response = {
    count: memberCount,
    pageId,
    pageSize,
    arr: members
  }
  return res.status(200).json(response)
})

/**
@admin admin
@desc Get count
@route GET /api/members/count
@access private
*/
const getMemberCount = asyncHandler(async (req, res) => {
  const memberCount = await Member.countDocuments()
  return res.status(200).json(memberCount)
})

/**
@admin admin
@desc Create new member
@route POST /api/members
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

const createMember = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, address, weight, height, remark, regDate, subscriptionExpiration, subscriptionStatus } = req.body
  if (!firstName || !lastName || !phone || !address) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const isPhoneExist = await Member.findOne({ phone })
  if (isPhoneExist) {
    res.status(400)
    throw new Error('Phone number already registerd!')
  }
  const token = randomValue(5)
  console.log(token)
  const newmember = await Member.create({ firstName, lastName, phone, address, weight, height, remark, token, regDate, subscriptionExpiration, subscriptionStatus })
  return res.status(201).json(newmember)
})

/**
@admin admin
@desc Get member
@route GET /api/members/:id
@access private
*/

const getMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id, commonProjection)
  if (!member) {
    res.status(404)
    throw new Error('member not found')
  }
  return res.status(200).json(member)
})

/**
@admin admin
@desc Update member
@route PUT /api/members/:id
@access private
*/

const updateMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id)
  if (!member) {
    res.status(404)
    throw new Error('member not found')
  }
  const phone = req.body.phone
  if (phone && phone !== member.phone) {
    const isPhoneExist = await Member.findOne({ phone })
    if (isPhoneExist) {
      res.status(400)
      throw new Error('Phone number already registerd!')
    }
  }
  const updatedmember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  return res.status(200).json(updatedmember)
})

/**
@admin admin
@desc Delete member
@route DELETE /api/members/:id
@access private
*/

const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id)
  if (!member) {
    res.status(404)
    throw new Error('member not found')
  }
  const { memberId } = member

  await Member.deleteOne({ _id: req.params.id })
  await User.deleteOne({ memberId })
  return res.status(200).json(member)
})

module.exports = { getMembers, getMemberCount, createMember, getMember, updateMember, deleteMember }
