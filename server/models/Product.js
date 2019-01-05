var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name:  {
        type: String,
        required: [true, 'name should not be empty']
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    imageUrl: {
        type: String,
        default:'https://unsplash.it/400/300?random'
    },
    redeemPoints: {
        type: Number
    }
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product