let express = require('express')
let loginRouter = express.Router()
let bodyParser = require('body-parser')
let sha256 = require('js-sha3').sha3_256
let MonDB = require('../DB/MongoTransactions.js')

loginRouter.use(bodyParser.urlencoded({ extended: false }))
loginRouter.use(bodyParser.json())

loginRouter.post('/',(req,res)=>{
  // 받은 Auth 데이터를 몽고DB에 쿼리
  // verification되면 세션에 등록

  let POSTED_EMAIL = req.body.EMAIL
  let POSTED_PW = sha256(req.body.PW)

  console.log(`${POSTED_EMAIL}와 ${POSTED_PW}`)

  let DB_Machine = new MonDB()

  DB_Machine.FORMAL_USER_AUTHENTICATION(POSTED_EMAIL,POSTED_PW).then((response)=>{
    res.json(response)
  }).catch((response)=>{
    res.json(response)
  })

})

module.exports = loginRouter

