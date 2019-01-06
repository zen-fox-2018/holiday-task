const {User, Item, Transaction} = require('../models')

class TransactionController {

    static addTransaction(req, res, next) {
        let userId = res.locals.payloads._id
        let items = req.body.items
        let total = 0;
        let transaction = {}
        let promises = items.map( i => {

            return Item.findById(i.itemId)
                .then((item) => {
                    if (item) {
                        total += i.amount * item.price
                       return {
                           itemId: item._id,
                           amount: i.amount
                       }                        
                    } else {
                        throw ('Item not found')
                    }
                })
        })

        Promise.all(promises)
            .then((data) => {
                return Transaction.create({
                    userId: userId,
                    totalPrice: total,
                    items: data
                })
            })

            .then((result) => {
                transaction = result
                let points = Math.floor(result.totalPrice / 100000)
                
                return User.findByIdAndUpdate(result.userId, {
                    $inc: {
                        points: points
                    }
                })
            })

            .then((updated) => {
                res.status(201).json({
                    result: {
                        transaction: transaction,
                        updated: {
                            userId: updated._id,
                            points: updated.points
                        }
                    }, 
                    error: null
                })
            })
        
            .catch((err) => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static getTransactions(req, res, next) {
        let userId = res.locals.payloads._id
        Transaction.find({
            userId: userId
        })
            .populate({
                path:'items.itemId',
                select: 'name'
            })
            .then((transactions) => {
                res.json({
                    result: transactions
                })
            })

            .catch((err) => {
                res.json({
                    error: err
                })
            })
    }

    static detailTransaction(req, res, next) {
        let userId = res.locals.payloads._id
        let transactionId = req.params.id
        Transaction.findOne({
            _id: transactionId,
            userId: userId
        })
            .populate({
                path:'items.itemId'
            })

            .then((transaction) => {
                res.json({
                    result: transaction,
                    error: null
                })
            })

            .catch((err) => {
                res.json({
                    result: null,
                    error: err
                })
            })
    }
}

module.exports = TransactionController