var mongoose = require('mongoose')
var Schema = mongoose.Schema

var itemSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    pointPrice: {
        type: Number
    }
})

var Item = mongoose.model('Item', itemSchema)

module.exports = Item