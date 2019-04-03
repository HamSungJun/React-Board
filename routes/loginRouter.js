let express = require('express')
let session = require('express-session')
let loginRouter = express.Router()
let bodyParser = require('body-parser')
let sha256 = require('js-sha3').sha3_256
let MonDB = require('../DB/MongoTransactions.js')
let uuid = require('uuid/v4')

loginRouter.use(bodyParser.urlencoded({ extended: false }))
loginRouter.use(bodyParser.json())
loginRouter.use(session({

  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },

  secret: 'hide sid',

  resave: false,

  saveUninitialized: true

}));

loginRouter.post('/',(req,res)=>{
  // 받은 Auth 데이터를 몽고DB에 쿼리
  // verification되면 세션에 등록

  let POSTED_EMAIL = req.body.EMAIL
  let POSTED_PW = sha256(req.body.PW)
  let REMEMBER = req.body.REMEMBER

  console.log(`${POSTED_EMAIL}와 ${POSTED_PW} 와 ${REMEMBER}`)

  let DB_Machine = new MonDB()

  DB_Machine.FORMAL_USER_AUTHENTICATION(POSTED_EMAIL,POSTED_PW).then((response)=>{

    // 로그인이 성공된 순간.

    for (key in response){

      req.session[key] = response[key]

    }

    console.log(req.session)
    req.session.SID = req.sessionID
    response.SID = req.session.SID
    res.json(response)

  }).catch((response)=>{
    res.json(response)
  })

})

module.exports = loginRouter

