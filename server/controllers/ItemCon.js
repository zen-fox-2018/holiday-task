const { Item } = require('../models')

class ItemController {
    static findAll(req, res, next) {
        Item.find()
            .then(items => {
                res.status(200).json({
                    result: items,
                    error: null
                })
            })
            .catch(err => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static create(req, res, next) {
        Item.create({
            name: req.body.name,
            price: req.body.price,
            point: req.body.point
        })
            .then(item => {
                res.status(201).json({
                    result: item,
                    error: null
                })
            })
            .catch(err => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static update(req, res, next) {
        Item.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            .then(item => {
                res.status(200).json({
                    result: item,
                    error: null
                })
            })
            .catch(err => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static delete(req, res, next) {
        Item.findByIdAndDelete(req.params.id)
            .then(item => {
                res.status(200).json({
                    result: item,
                    error: null
                })
            })
            .catch(err => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }
}

module.exports = ItemController