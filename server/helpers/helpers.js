const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  hash: (password) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
  },
  compare: (password, input) => {
    return bcrypt.compareSync(input, password)
  },
  token: (user) => {
    let token = jwt.sign({
      email: user.email
    }, process.env.SECRET)
    return token
  }
}