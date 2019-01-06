const Item = require('../models/Item.js')
const User = require('../models/User.js')
const Transaction = require('../models/Transaction.js')

class controller {
  static addCart(req, res) {
    let customerId = req.current_token._id
    let itemId = req.body.itemId
    return User.findByIdAndUpdate(customerId, { $push: { cart: itemId } })
      .populate('cart')
      .exec((error, cart) => {
        if (error) {
          res.status(400).json({error, message: error.message})
        } else {
          res.status(200).json({cart, message: 'success add to cart'})
        }
      })
  }

  static deleteCart(req, res) {
    User.findByIdAndUpdate(req.current_token._id, { $pull: { cart: req.body.itemId } })
      .populate('cart')
      .then(cart => {
        res.status(200).json({cart,message: "success delete"})
      })
      .catch(error => {
        res.status(400).json({error, message: error.message})
      })
  }

  static showCart(req, res) {
    User.findById(req.current_token._id)
      .populate('cart')
      .then(user => {
        res.status(200).json(user.cart)
      })
      .catch(error => {
        res.status(400).json({error, message: error.message})
      })
  }

  static checkout(req, res) {
    console.log("masuk checkout")
    let userId = req.current_token._id
    var point = 0
    var userPoint = 0
    User.findById(userId)
      .populate('cart')
      .then(user => {
        userPoint = user.point
        let total = 0
        user.cart.forEach(e => {
          total += e.price
        })
        console.log("total ===== ",total)
        if(total > 100000){
          point = Math.floor(total/100000)
          return Transaction.create({userId, itemId: user.cart, pointEarned: point})
        } else {
          return Transaction.create({userId, itemId: user.cart})
        }
      })
      .then(transaction => {
        return User.findByIdAndUpdate(userId, { cart: [], point: (userPoint + point) })
      })
      .then( data => {
        res.status(200).json({message: "success checkout"})
      })
      .catch(error => {
        res.status(400).json({error, message: error.message})
      })

    
  }

  static showTransaction(req, res){
    console.log('show HISTORY')
    Transaction.find({userId: req.current_token._id}).sort({date: -1})
    .then( transaction => {
      res.status(200).json(transaction)
    })  
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })
  }


}

module.exports = controller