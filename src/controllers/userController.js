const asyncHandler = require('express-async-handler')
const User = require('../models/user')
/**
@desc Get all users
@route GET /api/users
@access private
*/

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  return res.status(200).json(users)
})


/**
@desc Get count
@route GET /api/users/count
@access private
*/

const getCount = asyncHandler(async (req, res) => {
  const users = await User.count()
  return res.status(200).json(users)
})

/**
@desc Create new user
@route POST /api/users
@access private
*/
const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password, phone, address } = req.body
  if (!firstName || !lastName || !email || !username || !password || !phone || !address) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const newUser = await User.create({ firstName, lastName, email, username, password, phone, address })
  return res.status(201).json(newUser)
})

/**
@desc Get user
@route GET /api/users/:id
@access private
*/

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  return res.status(200).json(user)
})

/**
@desc Update user
@route PUT /api/users/:id
@access private
*/

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  return res.status(200).json(updatedUser)
})

/**
@desc Delete user
@route DELETE /api/users/:id
@access private
*/

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  await User.deleteOne({ _id: req.params.id })
  return res.status(200).json(user)
})

module.exports = { getUsers, getCount, createUser, updateUser, getUser, deleteUser }
