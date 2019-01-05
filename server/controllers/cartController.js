const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')

class CartController {
    static createCart(req, res) {
        let cart = new Cart({
            cartItems: [],
            userId: req.decoded._id
        })
        cart.save()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }

    static readCart(req, res) {
        Cart.find({
            userId: req.decoded._id,
            statusCheckOut: req.params.status
        })
        .populate('cartItems._id')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static updateIncrement(req, res) {
        Cart.findOne({
            _id: req.params.id,
            userId: req.decoded._id,
            'cartItems': { $elemMatch: { _id: req.body.itemId }} 
        })
        .then(result => { 
            if(result){
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded._id,
                    "cartItems._id": req.body.itemId,
                }, { 
                    $inc : {"cartItems.$.quantity" : 1, "cartItems.$.subTotal": req.body.increasePrice}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            } else {
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded._id
                }, { 
                    $push : {"cartItems" : {'_id' : req.body.itemId , 'quantity' : 1, 'subTotal': req.body.increasePrice }}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            }
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static updateCart(req, res) {
        Cart.findOne({
            _id: req.params.id,
            userId: req.decoded._id,
            'cartItems': { $elemMatch: { _id: req.body.itemId }} 
        })
        .then(result => { 
            if(result){
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded._id,
                    "cartItems._id": req.body.itemId,
                }, { 
                    $set : {"cartItems.$.quantity" : (req.body.quantity), "cartItems.$.subTotal": req.body.subTotal}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            } else {
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded._id
                }, { 
                    $push : {"cartItems" : {'_id' : req.body.itemId , 'quantity' : req.body.quantity, 'subTotal': req.body.subTotal }}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            }
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static deleteCartItem(req, res) {
        Cart.findOne({
            _id: req.params.id,
            userId: req.decoded._id,
            'cartItems': { $elemMatch: { _id: req.body.itemId }} 
        })
        .then(result => { 
            if(result){
                Cart.update({ 
                    _id: req.params.id,
                    userId: req.decoded._id
                }, { 
                    $pull : {"cartItems" : {'_id' : req.body.itemId }}
                })
                .then(updateData => {
                    res.status(200).json(updateData)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            } else {
                res.status(400).json({message: "item not found, you haven't buy this item"})   
            }
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static deleteCart(req, res) {
        Cart.deleteOne({ 
            _id: req.params.id 
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static checkOut(req, res) {
        Cart.update({
            _id: req.params.id,
            userId: req.decoded._id
        }, {
            statusCheckOut: "done",
            totalPrice: req.body.grandTotal
        })
        .then(result => { 
            User.find({
                _id: req.decoded._id
            })
            .then(user => {
                let newPoint = Math.floor(req.body.grandTotal / 100.000)
                User.update({
                    points: user.points + newPoint
                })
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(err => {
                    res.status(400).json(err.message)
                })
            })
            .catch( err => {
                res.status(400).json(err.message)
            })
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }
}

module.exports = CartController