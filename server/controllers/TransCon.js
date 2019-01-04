const Transaction = require('../models/Transaction')
const jwt = require('jsonwebtoken') 
const objId = require('mongoose').Types.ObjectId

module.exports = {
    createTrans: function (req, res ) {
        console.log(req.body.items)
        var decoded = jwt.verify(req.headers.token, 'secret')
        // console.log(decoded)
        let obj = {
            userId: objId(decoded.id),
            items: []
        }
        // console.log(req.body.items, '------')
        req.body.items.forEach(element => {
            obj.items.push(objId(element))
        });

        Transaction.create(obj)
            .then(data => {
                res.status(200).json({
                    msg: `Success create transaction `,
                    data
                })
            })
            .catch(err => {
                console.log(err, 'errrrr')
                res.status(500).json({
                    msg: `Internal server error`,
                    err
                })
            })
    },
    getMy: function(req, res) {
        var decoded = jwt.verify(req.headers.token, 'secret')

        Transaction.find({userId:objId(decoded.id)}).populate('userId').populate('items').exec() // populate buat nampilin smua kek join!
            .then(data => {
                res.status(200).json({
                    msg: `Success getting my transaction `,
                    data
                })
            })
            .catch(err => {
                res.status(500).json({
                    msg: `Internal server error`,
                    err
                })
            })
    }
}