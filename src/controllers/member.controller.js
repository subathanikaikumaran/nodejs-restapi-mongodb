const asyncHandler = require('express-async-handler')
const UserProfile = require('../models/userProfile')

/**
@admin user
@desc Get user
@route GET /api/users/profile
@access private
*/

const getMyProfile = asyncHandler(async (req, res) => {
  const user = await UserProfile.findById(req.user.id)
  if (!user) {
    res.status(404)
    throw new Error('User profile not found')
  }
  return res.status(200).json(user)
})

/**
@admin user
@desc Create new user
@route POST /api/users/profile
@access private
*/
const createMyProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, address, weight, height } = req.body
  if (!firstName || !lastName || !phone || !address) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const user = await UserProfile.findOne({ userId: req.user.id })
  if (user) {
    res.status(400)
    throw new Error('You have already added your profile.')
  }
  const newUser = await UserProfile.create({ userId: req.user.id, firstName, lastName, phone, address, weight, height })
  return res.status(201).json(newUser)
})

/**
@admin user
@desc Update user
@route PUT /api/users/profile
@access private
*/

const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await UserProfile.findOne({ userId: req.user.id })
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (user.userId.toString() !== req.user.id) {
    res.status(403)
    throw new Error('User do not permission to update.')
  }
  const updatedUser = await UserProfile.findByIdAndUpdate(
    user.id,
    req.body,
    { new: true }
  )
  return res.status(200).json(updatedUser)
})

/**
@admin admin
@desc Get all users
@route GET /api/users
@access private
*/

const getUserProfiles = asyncHandler(async (req, res) => {
  const users = await UserProfile.find()
  return res.status(200).json(users)
})

/**
@admin admin
@desc Get count
@route GET /api/users/count
@access private
*/

const getCountProfile = asyncHandler(async (req, res) => {
  const users = await UserProfile.count()
  return res.status(200).json(users)
})

/**
@admin admin
@desc Create new user
@route POST /api/users
@access private
*/
const createUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password, phone, address } = req.body
  if (!firstName || !lastName || !email || !username || !password || !phone || !address) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const newUser = await UserProfile.create({ firstName, lastName, email, username, password, phone, address })
  return res.status(201).json(newUser)
})

/**
@admin admin
@desc Get user
@route GET /api/users/:id
@access private
*/

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserProfile.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  return res.status(200).json(user)
})

/**
@admin admin
@desc Update user
@route PUT /api/users/:id
@access private
*/

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserProfile.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  const updatedUser = await UserProfile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  return res.status(200).json(updatedUser)
})

/**
@admin admin
@desc Delete user
@route DELETE /api/users/:id
@access private
*/

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await UserProfile.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  await UserProfile.deleteOne({ _id: req.params.id })
  return res.status(200).json(user)
})

module.exports = { getMyProfile, createMyProfile, updateMyProfile, getUserProfiles, getCountProfile, createUserProfile, updateUserProfile, getUserProfile, deleteUserProfile }
