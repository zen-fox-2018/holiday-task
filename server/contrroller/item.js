const Item = require('../models/item');

module.exports = {
  create(req, res) {
    Item.create({
      name: req.body.name,
      price: req.body.price
    })
      .then(item => {
        res.status(201).json(item)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  getAll(req, res) {
    Item.find({})
      .then(item => {
        res.status(200).json(item)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}