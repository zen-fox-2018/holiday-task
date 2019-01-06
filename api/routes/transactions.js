const router = require('express').Router()

router.get('/', function(req, res) {
  res.status(200).json({
    message: 'this is all transactions'
  })
})

router.post('/buy/:userId/:itemId', function(req, res) {
  res.status(200).json({
    message: 'register transactions'
  })
})

router.get('/:userId', function(req, res) {
  res.status(200).json({
    message: 'this is detail transaction',
    id: req.params.id
  })
})



module.exports = router