const User = require('../models/user')
const Item = require('../models/item')
const ObjectId = require('mongoose').Types.ObjectId
const jwt = require('jsonwebtoken');
const checkPass = require('../helpers/checPass')



function insert (req, res, next) {
    let insertData = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password
    }
    User.create(insertData)
    .then((user) => {
        res.status(201).json({
            msg: "success create user",
            user
        })
    })
    .catch((err) => {
        res.status(500).json({
            msg: "internal server error",
            error: err.message
        })
    })

}

function findOne(req, res, next) {

    User.findById(req.params.id)
    .then((User) => {
        if (User) {
            res.status(200).json({
                msg: `success get data with id ${req.params.id}`,
                data: User
            })
        } else {
            res.status(404).json({
                msg: `data with id ${req.params.id} not found`,
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            msg: "internal server error",
            error: err.message
        })
    })

}

function update(req, res, next) {
    let id = ObjectId(req.params.id)
    let data = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        password: req.body.password,
        point: req.body.point
    }
    for(element in data) {
        console.log(element)
        if (data[element] === undefined) {
            delete data[element]
        }
    };
    console.log(data)
    User.findOneAndUpdate({_id: id },{$set: data}, {new:true}  )
    .then((user) => {
        if (user) {
            res.status(201).json({
                msg: "success update data ",
                user
            })
        } else {
            res.status(404).json({
                msg: "id not found",
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            msg:'internal server errror',
            error: err.message
        })
    })
}

function login(req, res, next) {
    User.findOne({email: req.body.email})
    .then((user) => {
        if (!user) {
            res.status(404).json({
                msg: 'email not found',
            })
        } else {
            if (checkPass(user.password, req.body.password)) {
                res.status(200).json({
                    msg: 'user success login',
                    token: jwt.sign({ 
                        email: user.email,
                        id: user._id
                    }, 'shhhhh'),
                    id: user._id
                })
            } else {
                res.status(403).json({
                    msg: 'wrong password'
                })
            }
        }
    })
    .catch((err) => {
        res.status(500).json({
            msg: 'internal server error',
            error: err.message
        })
    })
}
function findAll(req, res, next) {

    User.find({})
    .then((Users) => {
        res.status(200).json({
            msg: "success get all data",
            data: Users
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({
            msg: "internal server error",
            error: err.message
        })
    })
}

function destroy(req, res, next) {
    let id = ObjectId(req.params.id)
    User.deleteOne({_id: id})
    .then((user) => {
        res.status(200).json({
            msg:`success delete user with id ${req.params.id}`,
            user
        })
    })
    .catch((err) => {
        res.status(500).json({
            msg: "internal server error",
            error: err.message
        })
    })
}

function myPoints(req, res, next) {
    console.log("masuk =========")
    let dataUser = null
    console.log(req.current_user)
    User.findById(req.current_user.id)
    .then((user) => {
        if (user) {
            dataUser = user
            Item.findOne({point: {$lte: user.point}})
            .then((items) => {
                console.log(items)
                console.log('masukkk nih ----------------')
                res.status(200).json({
                    msg: "success find user",
                    user: dataUser,
                    items
                })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: 'internal server error',
                    error: err.message
                })
            })
        } else {
            res.status(404).json({
                msg: 'id not found'
            })
        }
    })

    .catch((err) => {
        res.status(500).json({
            msg: 'internal server error',
            error: err.message
        })
    })
    
}

module.exports = {findAll, findOne, insert, destroy, update, login, myPoints}