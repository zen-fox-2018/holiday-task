const Item = require('../models/Item.js')
const User = require('../models//User.js')

class controller{
  static addItem(req,res) {
    let { name, price, pointNeeded } = req.body
    let newItem = { name, price, pointNeeded }

    Item.create(newItem)
      .then(item => {
        res.status(200).json({item, message: 'success add item'})
      })
      .catch(error => {
        res.status(400).json({error, message: error.message})
      })
  }

  static showItem(req,res){
    Item.find({})
    .then(items => {
      res.status(200).send(items)
    })
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })
  }

  // static updateItem(req,res) {

  // }

  // static deleteItem(req,res){

  // }

  static showRewardItem(req,res){
    User.findById(req.current_token._id)
    .then( user => {
      return Item.find({ pointNeeded: { $lte: user.point} })
    })
    .then(items => {
      res.status(200).send(items)
    })
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })
  }
}

module.exports = controller
