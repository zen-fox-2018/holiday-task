require('dotenv').config()
const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static registerUser(req, res, next) {
        User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })
        .then((user)=> {
            res.status(201).json({
                result : user,
                error : null
            })
        })
        .catch((err)=> {
            if(err.name === "ValidationError") {
                res.status(400).json({
                    result: null,
                    error: err.errors
                })
            } else {
                res.status(500).json({
                    result : null,
                    error : err
                })
            }
        })
    } 

    static loginUser(req, res, next) {
        User.findOne({
            email: req.body.email
        })
        .then((user)=> {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    let token = jwt.sign({
                        _id : user._id
                    }, process.env.JWT_SECRET)

                    res.status(200).json({
                        result: {
                            message: 'Success Login',
                            token
                        },
                        error : null
                    })
                } else {
                    res.status(400).json({
                        result: null,
                        error : "Wrong Password"
                    })
                }
            } else{
                res.status(400).json({
                    result: null,
                    error : "Wrong Email"
                })
            }
        })
        .catch(err=> {
            res.status(500).json({
                result: null,
                error: err
            })
        })
    }

    static profile(req, res, next)  {
        let DataUser = res.locals.payloads
        if(DataUser) {
          res.status(200).json({
            result : DataUser,
            error: null
          })
        } else {
          res.status(400).json({
            result : null, 
            error: {
              message: 'Please Login First'
            }
          })
        }
    }

    static editProfile(req, res, next) {
        let {_id} = res.locals.payloads
        let UpdateData  = req.body
       User.findById(_id) 
       .then (user => {
           if(user) {
                if(req.body.password){
                    user.name = req.body.name || user.name
                    user.email =  req.body.email || user.email
                    user.password = req.body.password
                    return user.save()
                } else {
                    return user.updateOne(UpdateData, {runValidators : true})
                }
           } else {
               res.status(404).json({
                   result : null,
                   error : {
                       message: 'Please Login'
                   }
               })
           }
       })
       .then(result => {
           if(result.nModified == 0) {
               res.status(400).json({
                   result : null,
                   error : {
                       message: 'failed update data'
                   }
               })
           } else {
               res.status(200).json({
                   result: 'Success update data',
                   error : null
               })
           }
       })
       .catch(err=> {
           res.status(500).json({
               result: null,
               error : err
           })
       })
    }

}

module.exports = UserController