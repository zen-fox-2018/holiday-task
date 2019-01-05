const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const middlewares = require('../middlewares/middleware')

router.get('/', middlewares.decoded, cartController.read)
router.post('/', middlewares.decoded, cartController.add)
router.delete('/', middlewares.decoded, cartController.remove)

module.exports = router