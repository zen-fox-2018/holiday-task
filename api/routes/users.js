const router = require('express').Router()

router.get('/', function(req, res) {
  res.status(200).json({
    message: 'this is users'
  })
})

router.post('/', function(req, res) {
  res.status(200).json({
    message: 'register users'
  })
})

router.get('/:id', function(req, res) {
  res.status(200).json({
    message: 'this is user profile',
    id: req.params.id
  })
})

router.patch('/:id', function(req, res) {
  res.status(200).json({
    message: 'this is for edit user profile',
    id: req.params.id
  })
})

router.get('/login/:id', function(req, res) {
  res.status(200).json({
    message: 'this is for user login',
    id: req.params.id
  })
})



module.exports = router