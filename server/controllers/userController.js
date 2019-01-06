const User = require('../models/User.js')
const item = require('../models/Item.js')
const {checkPassword} = require('../helpers/helper.js')
const jwt = require('jsonwebtoken')

class controller {
  static register(req, res){
    let {name, email, password} = req.body
    let newUser = {name, email, password}

    User.create(newUser)
    .then( user => {
      res.status(200).json({user, message: 'success create account'})
    })
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })
  }

  static login(req, res){
    let {email, password} = req.body

    User.findOne({email})
    .then( user => {
      if(user){
        if(checkPassword(password, user.password)){
          let token = jwt.sign({userId: user._id, email: user.email}, process.env.SECRET)
          res.status(200).json({token, message: 'success login'})
        } else {
          res.status(400).json({message: 'wrong password'})
        }
      } else {
        res.status(400).json({message: 'user not found'})
      }
    })
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })
  }

  static getProfile(req,res){
    let userId = req.params.userId

    User.findById(userId)
    .then( user => {
      if(user){
        res.status(200).json({user})
      } else {
        res.status(400).json({message: 'user not found'})
      }
    })
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })
  }
  
  static editProfile(req,res){
    let {name, email, newPassword} = req.body
    let updateUser = {name, email, newPassword}
    let userId = req.params.userId
    console.log(userId)
    console.log(updateUser)

    for(let key in updateUser){
      if(!updateUser[key]){
        delete updateUser[key]
      }
    }
    console.log(updateUser)
    
    User.findByIdAndUpdate(userId, updateUser)
    .then( user => {
      res.status(200).json({message: "success edit data user"})
    })
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })

  }
}

module.exports = controller