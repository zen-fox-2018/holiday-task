const Transaction = require('../models/transaction')
const ObjectId = require('mongoose').Types.ObjectId


function insert (req, res, next) {
    // console.log(req.current_user)
    let insertData= {
        UserId: req.current_user.id,
        items: []
    }
    req.body.items.forEach(element => {
        insertData.items.push(ObjectId(element))
    });
    Transaction.create(insertData)
    .then((transaction) => {
        res.status(201).json({
            msg: 'success create transaction',
            transaction
        })
    })
    .catch((err) => {
        res.status(500).json({
            msg: 'internal server error',
            error: err.message
        })
    })
}

function findAll(req, res, next) {
    let id = ObjectId(req.current_user.id)
    Transaction.find({UserId: id}).populate('UserId').populate('items').exec()
    .then((transactions) => {
        res.status(200).json({
            msg:'success get all data',
            transactions
        })
    })
    .catch((err) => {
        res.status(500).json({
            msg: 'internal server error',
            error: err.message
        })
    })
}



module.exports = {insert, findAll}