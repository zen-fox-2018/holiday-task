const User = require('../models/User')
const jwt = require('jsonwebtoken') 
const helper = require('../helpers/helper')
const Item = require('../models/Item')

module.exports = {
    createUser: function(req, res) {
        if(!req.body.name){
            res.status(404).json({
                msg: 'Name must be filled'
            })
        } else if (!req.body.email) {
            res.status(404).json({
                msg: 'Email must be filled'
            })
        } else if(!req.body.password) {
            res.status(404).json({
                msg: 'Password must be filled'
            }) 
        } else {
            User.findOne({email: req.body.email})
                .then(dataGetOne => {
                    if(dataGetOne) {
                        res.status(400).json({
                            msg: 'Email already exist'
                        })
                    } else {
                        const newUser = {
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            points: 0
                        }

                        User.create(newUser)
                            .then(data => {
                                res.status(200).json({
                                    msg: `Success create data `,
                                    data
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    msg: `Internal server error`,
                                    err: err.message
                                })
                            })
                    }
                })
                .catch(errGetOne => {
                    res.status(500).json({
                        msg: 'Internal server error'
                    })
                })
            
        }
    },
    getOne: function(req, res) {
        User.findById(req.params.id)
            .then(data => {
                if(data){
                    res.status(200).json({
                        msg: `Success finding data `,
                        data
                    })

                } else {
                    res.status(400).json({
                        msg: 'User not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            })
    },
    login: function(req, res) {
        if(!req.body.email) {
            res.status(400).json({
                msg: 'Email must be filled'
            })
        } else if (!req.body.password) {
            res.status(400).json({
                msg: 'Password must be filled'
            }) 
        } else {
            User.findOne({email: req.body.email})
            .then(data =>{
                if (!data) {
                    res.status(201).json({
                        msg: `Email not found`
                    })
                } else {
                    if(helper.checkPass(req.body.password, data.password)){
                        res.status(200).json({
                            msg: `Login success!`,
                            token: jwt.sign({ id: data._id,
                                 name: data.name,
                                 email: data.email, 
                                 points: data.points }, 'secret')
                        })
                    } else {
                        res.status(201).json({
                            msg: `Password wrong!`
                        })  
                    }
                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: 'Internal server error',
                    err
                })
            })
        }
    
    },
    editUser: function (req, res) {
        let obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        
        for (let i in obj) {
            if( obj[i] == undefined) {
                delete obj[i]
            }
        }

        User.findOneAndUpdate({_id: req.params.id} ,{$set:obj},{new:true})       
        .then((data)=>{
            res.status(200).json({
                msg: `Success editing data `,
                data
            })            
           
         })
         .catch((err)=>{
             console.log(err)
            res.status(500).json({
                msg: `Internal server error`,
                err
            })
         })
    },
    getAll: function(req, res) {
        User.find({})
            .then(data => {
                res.status(200).json({
                    msg: `Success finding data `,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`
                })
            })
    },
    myPoint: function(req, res) {
        var decoded = jwt.verify(req.headers.token, 'secret')
        let myPoint = 0
        User.findById(decoded.id)
            .then(dataUser => {
                myPoint = dataUser.points
                return Item.find({point: {$lte: dataUser.points}})
            })
            .then(dataFinal => {
                if(dataFinal.length == 0) {
                    res.status(200).json({
                        msg: 'You cannot purchase anything with your current points',
                        myPoint
                    })
                } else {
                    res.status(200).json({
                        msg: `Here are list of items you can purchase with your points`,
                        dataFinal,
                        myPoint
                    })

                }
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`,
                    err
                })
            })
    }
}