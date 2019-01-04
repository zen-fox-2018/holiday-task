const Item = require('../models/Item')

module.exports = {
    createItem: function(req, res) {
        let obj = {
            name: req.body.name,
            price: req.body.price,
            point: req.body.point
        }
        Item.create(obj)
            .then(data => {
                res.status(200).json({
                    msg: `Success adding  item`,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`,
                    err
                })
            })
    },
    getAll: function(req, res) {
        Item.find({})
            .then(data => {
                res.status(200).json({
                    msg: `Success getting item`,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`,
                    err
                })
            })
    },
    update: function(req, res) {
        let obj = {
            name: req.body.name,
            price: req.body.price,
            point: req.body.point
        }

        for(let i in obj) {
            if(obj[i] == undefined) {
                delete obj[i]
            }
        }
        // console.log(obj)
        Item.findByIdAndUpdate(req.params.id, {$set: obj}, {new: true})
            .then(data => {
                res.status(200).json({
                    msg: `Success edit item`,
                    data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    msg: `Internal server error`,
                    err
                })
            })
    },
    delete: function(req, res) {
        Item.findById(req.params.id)
            .then(data => {
               return  data.remove() // findby id and remove / delete g masuk ke hook
            })
            .then(sucDel => {
                res.status(200).json({
                    msg: `Success delete item`
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`,
                    err
                })    
            })
    }
}