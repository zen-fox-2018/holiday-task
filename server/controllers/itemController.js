const Item = require('../models/Item')

class itemController{

  static addItem(req,res){
    
    Item
    .create({
      itemName: req.body.itemName,
      price: req.body.price,
      point: req.body.point
    })
    .then(item =>{
      res
      .status(200)
      .json({
        msg: "success create data",
        data: item
      })
    })
    .catch(err =>{
      res
      .status(500)
      .json({
        msg: "internal server error",
        error:  err
      })
    })
  }

  static showItem(req, res){

    Item
    .find()
    .then(items =>{
      res
      .status(200)
      .json({
        msg: "fetch data success",
        data : items
      })
    })
    .catch(err =>{
      res
      .status(500)
      .json({
        msg: "fetch data failed",
        error: err
      })
    })
  }

  static modifyItem(req, res){

    Item
    .findOneAndUpdate({_id: req.params.id}, req.body)
    .then(item=>{
      res
      .status(200)
      .then({
        msg: "update success",
        data: item
      })
    })
    .catch(err =>{
      res
      .status(400)
      .json({msg: "update failed"})
    })
  }

  static deleteItem(req,res){

    Item
    .findOneAndDelete({_id: req.params.id})
    .then(item =>{
      res
      .status(200)
      .json({
        msg: "delete success",
        data: item
      })
    })
    .catch(err =>{
      res
      .status(400)
      .json({
        msg: "delet failed",
        error: err
      })
    })
  }

}

module.exports = itemController