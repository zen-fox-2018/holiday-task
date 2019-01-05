const Transaction = require('../models/transaction')
const User = require('../models/user')
const mongoose = require('mongoose')

module.exports = {
  find: (req, res) => {
    Transaction.find({
      user: mongoose.Types.ObjectId(req.decoded._id)
    }).populate('user').populate('item').exec()
    .then(transaction => {
      res.status(200).json({
        transaction: transaction
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err
      })
    })
  },
  create: (req, res) => {
    Transaction.create({
      user: mongoose.Types.ObjectId(req.decoded._id),
      item: req.body.item,
      date: new Date(),
      method: req.body.method,
      total: req.body.total
    })
    .then(transaction => {
      if(req.body.method === 'cash' && req.body.total >= 100000) {
        let point = Math.floor(req.body.total / 100000) * 10
        return User.findByIdAndUpdate(req.decoded._id, {
          point: req.decoded.point + point
        })
      } else {
        return transaction
      }
    })
    .then(data => {
      res.status(200).json({
        message: 'success checkout'
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err
      })
    })
  }
}