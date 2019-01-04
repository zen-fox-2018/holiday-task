const Item = require('../models/Item')

module.exports = {
    findAllItem: function(req, res) {
        Item.find({})
        .then(items => {
            res.status(200).json({
                msg: 'All Items List',
                items
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err
            })
        })
    },
    findOneItem: function(req, res) {
        Item.findById(req.params.id)
        .then(item => {
            res.status(200).json({
                msg: 'Item Found',
                item
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err
            })
        })
    },
    createItem: function(req, res) {
        let data = {
            name: req.body.name,
            price: req.body.price,
            point: req.body.points
        }
        Item.create(data)
        .then(item => {
            res.status(200).json({
                msg: 'Success Create Item',
                item
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err
            })
        })
    },
    updateItem: function(req, res) {
        let data = {
            name: req.body.name,
            points: req.body.points
        }
        for(let key in data) {
            if(data[key] === undefined) {
                delete data[key]
            }
        }
        Item.findByIdAndUpdate(req.params.id, {$set: data}, {new: true})
        .then(item => {
            res.status(200).json({
                msg: 'Success Update Item',
                item
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err
            })
        })
    },
    deleteItem: function(req, res) {
        Item.findByIdAndDelete(req.params.id)
        .then(item => {
            res.status(200).json({
                msg: 'Success Delete Item',
                item
            })
        })
        .catch(err => {
            res.status(500).json({
                msg: 'Internal Server Error',
                err
            })
        })
    }
}