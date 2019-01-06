const express = require('express')
const router = express.Router()
const userRoute = require('../routes/user')
const itemRoute = require('../routes/')

router.get('/', (req, res)=>{
  res
  .status(200)
  .json({
    msg: "success get index route"
  })
})

router.use('/user', userRoute)
router.use('/item', itemRoute)

module.exports = router