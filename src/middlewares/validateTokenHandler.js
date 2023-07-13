const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.Authorization || req.headers.authorization
  if (!authHeader) {
    res.status(401)
    throw new Error('User is not authorized or Token is missing!')
  }
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
    if (!token) {
      res.status(401)
      throw new Error('User is not authorized or Token is missing!')
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401)
        throw new Error('User is not authorized!')
      }
      req.user = decoded.user
      next()
    })
  }
})

module.exports = validateToken
