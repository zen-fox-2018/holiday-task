const Item = require('../models/item')
const ObjectId = require('mongoose').Types.ObjectId


function insert(req, res, next) {
    let insertData = {
        name: req.body.name,
        price: req.body.price,
        point: req.body.point
    }
    Item.create(insertData)
    .then((item) => {
        res.status(201).json({
            msg: 'success create item',
            item
        })
    })
    .catch((err) => {
        res.status(500).json({
            msg: 'internal server error',
            error: err.message
        })
    })
}
function findOne(req, res, next) {

    Item.findById(req.params.id)
    .then((item) => {
        if (item) {
            res.status(200).json({
                msg: `success get data with id ${req.params.id}`,
                data: item
            })
        } else {
            res.status(404).json({
                msg: `data with id ${req.params.id} not found`,
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            msg: "internal server error",
            error: err.message
        })
    })

}

function update(req, res, next) {
    let id = ObjectId(req.params.id)
    let data = {
        name: req.body.name,
        Price: req.body.Price,
        Point: req.body.Point
    }
    data.forEach(element => {
        if (element === undefined) {
            delete element
        }
    });
   Item.findOneAndUpdate({_id: id }, data )
    .then((item) => {
        if (item) {
            res.status(201).json({
                msg: "success update data ",
                item
            })
        } else {
            res.status(404).json({
                msg: "id not found",
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            msg:'internal server errror',
            error: err.message
        })
    })
}

function findAll(req, res, next) {

    Item.find({})
    .then((items) => {
        res.status(200).json({
            msg: "success get all data",
            data: items

        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            msg: "internal server error",
            error: err.message
        })
    })
}

function destroy(req, res, next) {
    let id = ObjectId(req.params.id)
    Item.deleteOne({_id: id})
    .then((item) => {
        res.status(200).json({
            msg:`success delete item with id ${req.params.id}`,
            item
        })
    })
    .catch((err) => {
        res.status(500).json({
            msg: "internal server error",
            error: err.message
        })
    })
}



module.exports = {insert, findOne, update, findAll, destroy}