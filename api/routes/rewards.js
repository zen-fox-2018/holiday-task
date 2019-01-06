const router = require('express').Router()

router.get('/', function(req, res) {
  res.status(200).json({
    message: 'this is reward items'
  })
})

router.post('/', function(req, res) {
  res.status(200).json({
    message: 'add reward items'
  })
})

router.get('/:id', function(req, res) {
  res.status(200).json({
    message: 'this is detail reward item',
    id: req.params.id
  })
})

router.patch('/:id', function(req, res) {
  res.status(200).json({
    message: 'this is for edit reward item',
    id: req.params.id
  })
})

router.delete('/:id', function(req, res) {
  res.status(200).json({
    message: 'this is for deleting reward item',
    id: req.params.id
  })
})



module.exports = router