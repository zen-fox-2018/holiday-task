const User = require('../models/user')
const helpers = require('../helpers/helpers')

module.exports = {
  create: (req, res) => {
    User.create({
      email: req.body.email,
      password: req.body.password
    })
    .then(user => {
      res.status(200).json({
        message: 'success create account'
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err.errors
      })
    })
  },
  login: (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .then(user => {
      if(!user) {
        res.status(400).json({
          errors: {
            message: 'wrong email'
          }
        })
      } else {
        let check = helpers.compare(user.password, req.body.password)
        if(!check) {
          res.status(400).json({
            errors: {
              message: 'wrong password'
            }
          })
        } else {
          res.status(200).json({
            token: helpers.token(user)
          })
        }
      }
    })
    .catch(err => {
      res.status(err).json({
        errors: err.errors
      })
    })
  },
  update: (req, res) => {
    User.findByIdAndUpdate(req.decoded._id, {
      gender: req.body.gender
    }, {
      new :true
    })
    .then(user => {
      res.status(200).json({
        user: user
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err.errors
      })
    })
  }
}