const bcrypt = require('bcryptjs')

function encrypt(password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function checkPassword(input, password) {
  return bcrypt.compareSync(input, password)
}

module.exports = { encrypt, checkPassword }