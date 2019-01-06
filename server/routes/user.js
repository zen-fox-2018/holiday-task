const express = require('express')
const router = express.Router()
const userController  = require('../controllers/userController')

router.get('/', (req, res)=>{
  res
  .status(200)
  .json({
    msg: "success get user route "
  })
})

router.post('/register', userController.createUser)
router.post('/login', userController.userLogin)
router.put('/:id',userController.editProfile )
router.get('/:id', userController.myProfile)

module.exports = router