let express = require('express')
let loginRouter = express.Router()
let bodyParser = require('body-parser')
let shajs = require('sha.js')
let MonDB = require('../MongoTransactions.js')

loginRouter.use(bodyParser.urlencoded({ extended: false }))
loginRouter.use(bodyParser.json())

loginRouter.post('/nonformal',(req,res)=>{

  let NF_USER_ID = req.body.ID;

  let NF_USER_PW = req.body.PW;
  // Hashed Password
  let Hashed = shajs('sha256').update(NF_USER_PW).digest('hex')  

  
  MonDB.INSERT_TO_NON_FORMAL_USERS({})

})

module.exports = loginRouter

