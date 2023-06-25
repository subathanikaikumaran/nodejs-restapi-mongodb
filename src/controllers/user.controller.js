const getUsers = (req, res) => {
  return res.status(200).json('User API')
}
const createUser = (req, res) => {
  return res.status(200).json('Create User API')
}
module.exports = { getUsers, createUser }
