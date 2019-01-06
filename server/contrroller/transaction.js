const Transaction = require('../models/transaction');

module.exports = {
  create(req, res) {
    let transactions = req.body.transactions
    let body = req.body.cart
    transactions.forEach(e => {
      let data = {}
      data.user = req.user._id
      data.item = body[e].id
      data.count = body[e].qty
      Transaction.create(data)
        .then(transaction => {
          res.status(201).json(transaction)
        })
        .catch(err => {
          console.log(err)
          res.status(400).json(err)
        })
    });

  },
  getUserTransaction(req, res) {
    Transaction.find({
      user: req.user.id
    }).populate('user').populate('item')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}