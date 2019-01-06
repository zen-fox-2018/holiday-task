const Item = require('../models/Items')

module.exports = {
    findAll: function(req, res) {
        Item
            .find({})
            .then((items) => {
                res.status(200).json(items)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    },
    addItem: function(req, res) {
        let newItem = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            pointPrice: req.body.pointPrice
        }
        Item
            .create(newItem)
            .then((item) => {
                res.status(201).json(item)
            })
            .catch((err) => {
                res.status(500).json(err.message)
            })
    }
}