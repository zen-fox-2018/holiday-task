const User = require('../models/user');
const helper = require('../helper/helper');

module.exports = {
  register(req, res) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: true
    })
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
    },
    login(req, res) {
      User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (user) {
          if (helper.comparePassword(req.body.password, user.password)) {
            let token = helper.generateToken(user._id, user.email)
            res.status(200).json({token, user})
          } else {
            res.status(400).json({err: 'Wrong password!'})
          }
        } else {
          res.status(400).json({err: 'User not found'})
        }
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  },
  getOne(req, res) {
    User.findById(req.user.id)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  },
  edit(req, res) {
    let input = helper.getInputBody(req.body.whitelist, req.body.data)
    console.log(input)
    User.findOneAndUpdate({
      _id: req.user.id
    }, input)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}