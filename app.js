let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/login',(req,res)=>{

  let ID = req.body.ID
  let PW = req.body.PW
  let REMEMBER = req.body.REMEMBER
  console.log(`${ID} 와 ${PW} 리멤버 ${REMEMBER}`)

  if((ID === '함성준') && (PW === '123')){
    res.json({
      status : 1
    })
  }
  else{
    res.json({
      status : 0
    })
  }
    res.end();
})

app.listen(3000,()=>{
  console.log('3000 go')
})