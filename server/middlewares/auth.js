const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

function authentication(req,res,next){
    console.log('masuk authentication')
    let token = req.headers.token
    // console.log(token)
    jwt.verify(token,process.env.SECRET, function(err, decoded){
      // console.log(err)
      if(err){
        res.status(400).send({error: 'user not found, please login'})
      } else {
        User.findOne({
          email: decoded.email
        })
        .then(user => {
          // console.log(user)
          req.current_token = user
          next() 
        })
        .catch( error =>{
          console.log("error")
          res.status(400).send({error: 'user not found, please login'})
        })
      }
    })
}

module.exports = authentication