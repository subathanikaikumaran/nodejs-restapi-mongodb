const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
@desc Login user
@route GET /api/login
@access public
*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('User does not exist!')
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
        username: user.username,
        email: user.email,
        id: user.id
      }
    }, process.env.JWT_SECRET,
    { expiresIn: '30m' })
    return res.status(200).json({ accessToken })
  } else {
    res.status(401)
    throw new Error('Invalid data!')
  }
})

/**
@desc Register new user
@route POST /api/users/register
@access public
*/
const registerUser = asyncHandler(async (req, res) => {
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
@desc Current user info
@route GET /api/users/current
@access private
*/

const currentUser = async (req, res) => {
  return res.status(200).json(req.user)
}

module.exports = { loginUser, registerUser, currentUser }
