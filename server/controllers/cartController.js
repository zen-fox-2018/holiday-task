const Cart = require('../models/cart')
const mongoose = require('mongoose')

module.exports = {
  add: (req, res) => {
    Cart.findOne({
      user: mongoose.Types.ObjectId(req.decoded._id)
    })
    .then(cart => {
      if(!cart) {
        return Cart.create({
          user: req.decoded._id,
          item: req.body.item
        })
      } else {
        return Cart.findOneAndUpdate({
          user: mongoose.Types.ObjectId(req.decoded._id)
        }, {
          $push: {
            item: req.body.item
          }
        }, {
          new: true
        })
      }
    })
    .then(data => {
      res.status(200).json({
        cart: data
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err
      })
    })
  },
  read: (req, res) => {
    Cart.find({
      user: mongoose.Types.ObjectId(req.decoded._id)
    })
    .then(cart => {
      res.status(200).json({
        cart: cart
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err
      })
    })
  },
  remove: (req, res) => {
    Cart.findOneAndDelete({
      user: mongoose.Types.ObjectId(req.decoded._id)
    })
    .then(data => {
      res.status(200).json({
        message: 'success remove cart'
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err
      })
    })
  }
}