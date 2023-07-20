const crypto = require('crypto')

function randomValue (length) {
  const uniqueValues = new Set()

  function generateRandomValue () {
    const randomBytes = crypto.randomBytes(length)
    return randomBytes.toString('hex')
  }

  let randomValue = generateRandomValue()

  while (uniqueValues.has(randomValue)) {
    randomValue = generateRandomValue()
  }

  uniqueValues.add(randomValue)

  return randomValue
}

module.exports = { randomValue }
