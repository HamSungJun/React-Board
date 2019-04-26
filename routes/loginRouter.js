let express = require('express')

let loginRouter = express.Router()
let bodyParser = require('body-parser')
let sha256 = require('js-sha3').sha3_256
let MonDB = require('../DB/MongoTransactions.js')

loginRouter.use(bodyParser.urlencoded({ extended: false }))
loginRouter.use(bodyParser.json())

loginRouter.post('/',(req,res) => {
  // 받은 Auth 데이터를 몽고DB에 쿼리
  // verification되면 세션에 등록

  let POSTED_EMAIL = req.body.EMAIL
  let POSTED_PW = sha256(req.body.PW)
  let REMEMBER = req.body.REMEMBER

  console.log(`${POSTED_EMAIL}와 ${POSTED_PW} 와 ${REMEMBER}`)

  let DB_Machine = new MonDB()

  DB_Machine.FORMAL_USER_AUTHENTICATION(POSTED_EMAIL,POSTED_PW).then((response)=>{

    // 로그인이 성공된 순간.

    console.log(req.session.EAMIL)

    if(req.session.EMAIL === undefined){
      req.session.EMAIL = response.EMAIL
      response.SID = req.sessionID
      
    }
    

    res.json(response)


  }).catch((response)=>{

    res.json(response)

  })

})

loginRouter.post('/getSessionData',(req,res) => {

// 서버상의 세션아이디와 클라이언트의 쿠키에 저장된 세션아이디가 동일하다면
// DB_Machine을 통해서 유저 정보를 재전송 해준다.

  const POSTED_SID = req.body.SID

  console.log(`SID :  ${POSTED_SID}`)
  console.log(`req.sessionID : ${JSON.stringify(req.sessionID)}`)
  
  if(req.sessionID === POSTED_SID){

    let DB_Machine = new MonDB()
    const SESSION_EMAIL = req.session.EMAIL
    DB_Machine.GET_USER_DATA_FROM_FORMALUSERS(SESSION_EMAIL).then((response) => {

      res.json(response)

    }).catch((response) => {

      res.json(response)

    })
    
  }

})

module.exports = loginRouter

