var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/users')

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({
    message: "server running on port 3000"
  })
})
router.post('/register', userControllers.register)
router.post('/login', userControllers.login)


module.exports = router;
