var mongoose = require(`mongoose`)

var itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    minimumPoints: Number,
})

var Item = mongoose.model(`Item`, itemSchema)

module.exports = Item