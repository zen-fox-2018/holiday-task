function authUser(req, res, next) {
    var jwt = require('jsonwebtoken');
    const User = require('../models/user')
    // console.log(req)
    var decoded = jwt.verify(req.headers.token, 'shhhhh');
    // console.log(decoded)
    User.findOne({email: decoded.email})
    .then((user) => {
        if (user) {
            // console.log(user)
            req.current_user = decoded
            console.log('masukk')
            next()
        } else {
            res.status(404).json({
                msg: 'id user not found'
            })
        }
    })
    .catch((err) => {
        // console.log(err, "==================>")
        res.status(500).json({
            msg: 'internal server error',
            error: err.message
        })
    })
}


module.exports = authUser