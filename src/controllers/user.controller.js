const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

/**
@admin admin
@desc Get all users
@route GET /api/users
@access private
*/

const getUserList = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ username: -1 })
  return res.status(200).json(users)
})

/**
@admin admin
@desc Get all users
@route GET /api/users
@access private
*/

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  return res.status(200).json(users)
})

/**
@admin admin
@desc Get count
@route GET /api/users/count
@access private
*/

const getCount = asyncHandler(async (req, res) => {
  const users = await User.count()
  return res.status(200).json(users)
})

/**
@admin admin
@desc Create new user
@route POST /api/users
@access private
*/
const createUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body
  if (!email || !username || !password) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    res.status(400)
    throw new Error('User already registerd!')
  }
  // Hash pwd
  const hashPwd = await bcrypt.hash(password, 10)

  const newUser = await User.create({ email, username, password: hashPwd })
  if (newUser) res.status(201).json({ _id: newUser.id, email: newUser.email })
  res.status(400)
  throw new Error('User data is not valid!')
})

/**
@admin admin
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
@admin admin
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
@admin admin
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
module.exports = { getUsers, getCount, createUser, updateUser, getUser, deleteUser, getUserList }
