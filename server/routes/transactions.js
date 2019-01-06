const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Transaction = require('../models/transaction');
const { userAuthentication } = require('../middleware/middleware')

// create new transaction 
router.post('/', userAuthentication, function(req, res) {
    let newTransaction = new Transaction({
        user: req.currentUser._id,
        items: req.body.items, // [obj_id, obj_id, obj_id]
        total_price: req.body.total_price,
        created_at: new Date(),
    });
    let additional_point = Math.floor(req.body.total_price / 100000);
    newTransaction.save(function(err) {
        if (err) res.status(400).json({err: err.message})
        else {
            User.findOneAndUpdate({_id: req.currentUser._id},  
                {
                    $push: { transactions: newTransaction._id },
                    $inc: { points: additional_point }
                }, function(err, result) {
                if (err) res.status(400).json({err: err.message})
                else {
                    // add point 
                    res.status(200).json(result)
                }
            })
        }
    })
})

// get transaction based on current user
router.get('/user', userAuthentication, function(req, res) {
    return User.find({email: req.currentUser.email})
    .populate({
        path: 'transactions',
        populate: {
            path: 'items'
        }
    })
    .exec((err, user) => {
        if (err) res.status(400).json({err: err.message})
        else {
            res.status(200).json(user[0].transactions)
        }
    })
})

// get transactoin based on transaction id
router.get('/:transaction_id', userAuthentication, function(req, res) {
    return Transaction.find(
        {
            _id: req.params.transaction_id
        })
        .populate('user')
        .populate('items')
        .exec((err, transaction) => {
            if (err) res.status(400).json({err: err.message})
            else {
                res.status(200).json(transaction)
            }
        })
})

module.exports = router;
