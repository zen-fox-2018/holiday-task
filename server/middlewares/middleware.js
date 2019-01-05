const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  decoded: (req, res, next) => {
    const token = req.headers.token
    if(!token) {
      res.status(400).json({
        errors: {
          message: 'token undefined'
        }
      })
    }
    try {
      let decode = jwt.verify(token, process.env.SECRET)
      User.findOne({
        email: decode.email
      })
      .then(user => {
        if(!user) {
          res.status(400).json({
            errors: {
              message: 'user not found'
            }
          })
        } else {
          req.decoded = user
          next()
        }
      })
      .catch(err => {
        res.status(400).json({
          errors: err.errors
        })
      })
    } catch (err) {
      res.status(400).json({
        errors: err
      })
    }
  }
}