const jwt = require(`jsonwebtoken`)
const User = require(`../models/User`)

function checkLogin(req, res, next) {
    const token = req.headers.token
    let decoded = jwt.verify(token, `secret`)

    User.findOne({
        _id: decoded._id
    })
        .then((result) => {
            if (result) {
                req.user = decoded
                next()
            } else {
                res.send(`User not found`)
            }
        }).catch((err) => {
            res.json(err)
        });

}

module.exports = checkLogin