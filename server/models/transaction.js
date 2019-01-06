var mongoose = require(`mongoose`)

var transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Item`
    }],
})

var transaction = mongoose.model(`Transaction`, transactionSchema)

module.exports = transaction