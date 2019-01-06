const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {

  static createUser (req, res, next){

    User
    .create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    .then(user =>{
      res
      .status(200)
      .json({
        msg: "success create data",
        data: user
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

  static userLogin(req, res, next){
    User
    .findOne({username:req.body.username})
    .then(user =>{

      if(!user.username){
        res
        .status(400)
        .json({msg: "username not found" })
      } 
      else if(bcrypt.compareSync(req.body.password, user.password)){
        res
        .status(200)
        .json({
          msg: "login success",
          token: jwt.sign({
            _id:user._id,
            username: user.username,
            email: user.email
          }, 'secret')
        })
      } else{
        res
        .status(400)
        .json({msg: "incorrect password"})
      }
    })
    .catch(err =>{
      res
      .status(500)
      .json({msg: "internal server error"})
    })
  }

  static editProfile(req, res, next){
    User
    .findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() =>{
      findOne({_id: req.params.id})
      .then(user =>{
        res
        .status(200)
        .json({
          msg: "edit data success",
          data: user })
      })
    })
    .catch(err =>{
      res
      .status(400)
      .json({msg: "profile not found"})
    })
  }

  static myProfile(req, res, next){
    User
    .findOne({_id:req.params.id})
    .then(user =>{
      res
      .status(200)
      .json({myProfile: user})
    })
    .catch(err =>{
      res
      .status(400)
      .json({msg: "profile not found"})
    })
  }
}

module.exports = UserController