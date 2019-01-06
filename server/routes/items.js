const express = require('express');
const router = express.Router();
const { ItemController } = require('../controllers')
const { checkLogin, checkAdmin } = require('../middlewares')

router.use(checkLogin)
router.get('/', ItemController.findAll)
router.use(checkAdmin)
router.post('/create', ItemController.create)
router.patch('/:id', ItemController.update)
router.delete('/:id', ItemController.delete)

module.exports = router;
