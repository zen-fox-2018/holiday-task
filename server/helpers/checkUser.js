const jwt = require('jsonwebtoken')

module.exports = {
    checkUser: function(req, res, next) {
        const decoded = jwt.verify(req.headers.token, 'secret')
        if(decoded.email) {
            req.user = decoded
            next()
        } else {
            res.status(403).json({
                msg: `Please login first!`
            })
        }
    }
}