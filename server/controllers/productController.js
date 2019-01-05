const Product = require('../models/Product')

class ProductController {
    static createProduct(req, res) {
        let product = new Product({
            name:  req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            redeemPoints: req.body.redeemPoints
        })
        product.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static readProduct(req, res) {
        Product.find({})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static updateProduct(req, res) {
        Product.updateOne({ 
            _id: req.params.id
        }, { 
            name:  req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            redeemPoints: req.body.redeemPoints
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }

    static deleteProduct(req, res) {
        Product.deleteOne({ 
            _id: req.params.id 
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }
}

module.exports = ProductController