const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Item = require('../models/item');
const bcrypt = require('../helpers/bcrypt');
const { checkPassword, userAuthentication } = require('../middleware/middleware');
const jwt =  require('../helpers/jsonwebtoken');

// register
router.post('/signup', function(req, res) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.generatePassword(req.body.password)
  })
  newUser.save(function(err) {
    if (err) res.status(400).json({err: err.message})
    else {
      res.status(200).json({
        newUser: newUser,
        message: 'Success add new User'
      })
    }
  })
})
// login
router.post('/login', checkPassword, function(req, res) {
  let token = jwt.createToken(req.currentUser._id, req.currentUser.name, req.currentUser.email);
  res.status(200).json({
    name: req.currentUser.name, 
    token: token
  });
})
// my profile
router.get('/:id', userAuthentication,  function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.status(400).json({err:  err.message}) 
    else  {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(200).json({message: 'User not found'})
      }
    }
  })
})
// edit my profile
router.put('/:id', userAuthentication, function(req, res) {
  let updated_value = {
    name: req.body.name
  }
  User.findByIdAndUpdate(req.params.id, updated_value, function(err, user) {
    if (err) res.status(400).json({err: err.message})
    else {
      // return updated user
      res.status(200).json({message: 'sucess update user profile'})
    }
  })
})
// suggestion
router.get('/:id/suggestion', userAuthentication, function(req, res) {
  Item.find({})
  .where('exchanged_with_point').equals(true)
  .where('points_required').gt(0).lt(req.currentUser.points)
  .exec((err, item) => {
    if (err) res.status(400).json({err: err.message})
    else {
      res.status(200).json({
        user_point: req.currentUser.points,
        item_reward: item
      })
    }
  })
})

module.exports = router;
