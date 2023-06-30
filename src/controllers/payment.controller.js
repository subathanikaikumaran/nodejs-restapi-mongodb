/** Get All Payment details */
const getPayment = (req, res) => {
  return res.status(200).json('Payment API')
}
/** Do the user Payment details */

const doPayment = (req, res) => {
  return res.status(200).json('Create Payment API')
}
/** Update Payment details */

const updatePayment = (req, res) => {
  return res.status(200).json('Update Payment API')
}
module.exports = { getPayment, doPayment, updatePayment }
