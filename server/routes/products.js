var express = require('express');
var router = express.Router();
var product = require('../controllers/productController')
const { isAdmin } = require('../middleware/isAdmin')
const { isLogin } = require('../middleware/isLogin')

router.post('/', isLogin, isAdmin, product.createProduct);
router.get('/', product.readProduct);
router.put('/:id', isLogin, isAdmin, product.updateProduct);
router.delete('/:id', isLogin, isAdmin, product.deleteProduct);

module.exports = router;
