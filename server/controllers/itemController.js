const Item = require('../models/item');

module.exports = {
  find: (req, res) => {
    Item.find({
      method: req.params.method
    })
    .then(item => {
      res.status(200).json({
        items: item
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err
      })
    })
  },
  create: (req, res) => {
    Item.create({
      name: req.body.name,
      price: req.body.price,
      method: req.body.method
    })
    .then(item => {
      res.status(200).json({
        item: item
      })
    })
    .catch(err => {
      res.status(400).json({
        errors: err
      })
    })
  }
}