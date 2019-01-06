
const {Item} = require('../models')


class ItemController {
    static getAllItem(req, res, next) { 
        Item.find()
        .then(items => {
            res.status(200).json({
                result: items, 
                error : null
            })
        })
        .catch(err => {
            res.status(500).json({
                result: null,
                error : err
            })
        })
    }

    static addItem(req, res, next) {
        Item.create({
            name: req.body.name,
            price: req.body.price,
            pointNeeded: req.body.pointNeeded
        })
        .then(user => {
            res.status(201).json({
                result: user,
                error : null
            })
        })
        .catch(err => {
            if(err.name === "ValidationError") {
                res.status(400).json({
                    result: null,
                    error: err.errors
                })
            } else {
                res.status(500).json({
                    result : null,
                    error : err
                })
            }
        })
    }

    static updateItem(req, res, next) {
        let id = req.params.id
        Item.findByIdAndUpdate(id, {
            name: req.body.name,
            price: req.body.price,
            pointNeeded :  req.body.pointNeeded
        })
        .then(result=> {
            if(result.nModified == 0) {
                res.status(400).json({
                    result: null,
                    error :'Failed to update item'
                })
            } else {
                res.status(200).json({
                    result: 'Success update item',
                    error : null
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                result : null,
                error : err
            })
        })
    }

    static deleteItem(req, res, next) {
        let id = req.params.id
        Item.findByIdAndDelete(id)
        .then(item => {
            res.status(200).json({
                result : item,
                error : null
            })
        })
        .catch(err => {
            res.status(500).json({
                result: null,
                error :err
            })
        })
    }
}

module.exports =  ItemController