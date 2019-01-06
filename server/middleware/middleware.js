const helper = require('../helper/helper');
const User = require('../models/user');

module.exports = {
  authentication(req, res, next) {
    let decode = helper.decodeToken(req.headers.token)
    User.findOne({
      email: decode.email
    })
      .then(user => {
        if (!user) res.status(400).json({err: 'access denied'})
        req.user = user
        next()
      })
      .catch(err => {
        res.status(400).json({err: 'Please login!'})
      })
  },
  authorizationAdmin(req, res, next) {
    req.user.isAdmin ? next() : res.status(400).json({err: 'access denied'})
  },
  findUser(req, res, next) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          res.status(400).json({
            msg: 'user already exist!'
          })
        }
        next()
      })
      .catch(err => {
        res.status(400).json({err: err.message})
      })
  } 
}