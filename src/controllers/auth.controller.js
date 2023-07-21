const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Member = require('../models/member.model')
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
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive
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
  const { email, username, password, token } = req.body
  if (!email || !username || !password || !token) {
    res.status(400)
    throw new Error('All fields are required!')
  }
  // check the user already be a member
  const member = await Member.findOne({ token })
  if (!member) {
    res.status(400)
    throw new Error('Invalid Token!')
  }

  const isUserExist = await User.findOne({
    $or: [{ email }, { memberId: member._id }]
  })

  if (isUserExist) {
    res.status(400)
    throw new Error('User already registerd!')
  }
  // Hash pwd
  const hashPwd = await bcrypt.hash(password, 10)

  const newUser = await User.create({ email, username, password: hashPwd, memberId: member._id, isActive: true })
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
