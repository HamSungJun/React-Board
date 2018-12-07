let express = require('express')
let registerRouter = express.Router()
let bodyParser = require('body-parser')
let fs = require('fs')
let formidable = require('formidable')
let sha256 = require('js-sha3').sha3_256
let MonDB = require('../DB/MongoTransactions.js')
let secret = require('../DB/secret')
let mailer = require('../routes/mailer.js')

registerRouter.use(bodyParser.urlencoded({ extended: false }))
registerRouter.use(bodyParser.json())
registerRouter.use(bodyParser.text())
registerRouter.use(express.static('../'))

registerRouter.post('/nonformalRegisterFile',(req,res)=>{
  
  let form = new formidable.IncomingForm()
  let unique = Date.now()
  let tmpPath = `./tmp/${unique}`
  
  process.chdir('./tmp')
  fs.mkdirSync(`./${unique}`)
  process.chdir('../')

  form.encoding = 'utf-8'
  form.type = true
  form.uploadDir = tmpPath

  form.parse(req,(err,field,file)=>{

    if(err){throw err}

    let oldPath = file.filepond.path
    let newPath ='./public/UserImages/' 
    
    fs.rename(oldPath,`${newPath}${unique}.${getExt(file.filepond.type)}`,(err)=>{
      if(err){throw err}

      fs.rmdir(`./tmp/${unique}`,(err)=>{
        if(err){throw err}
      })
    })


    res.end(unique.toString())
  })

})

registerRouter.delete('/nonformalRegisterFile',(req,res)=> {
  
  let uniqueID = req.body

  fs.readdir('./public/UserImages',(err,files) => {

    if(err){throw err}

    files.forEach((el) => {

      let nameonly = el.split('.')

      if(nameonly[0] === uniqueID){

        fs.unlink(`./public/UserImages/${el}`,(err)=>{
          if(err){throw err}
        })
        
      }
    })
  })

})

registerRouter.post('/nonformalRegisterSubmit',(req,res) => {

  let NF_USER_EMAIL = req.body.EMAIL
  let NF_USER_USERNAME = req.body.USERNAME
  let NF_FILE_NAME = req.body.FILENAME
  let NF_USER_PW = req.body.PW
  let NF_TIME_ID = NF_FILE_NAME.substr(0,NF_FILE_NAME.length-4)
  let createdAt = new Date()

  let DB_Machine = new MonDB();

  DB_Machine.INSERT_NONFORMAL({
    TIMEID : NF_TIME_ID,
    EMAIL : NF_USER_EMAIL,
    USERNAME : NF_USER_USERNAME,
    PW : sha256(NF_USER_PW),
    U_IMG_PATH : `./public/UserImages/${NF_FILE_NAME}`,
    createdAt : createdAt
  },secret.MongoCollections.nonformalUsers).then((response)=>{
    res.json(response)
    mailer(NF_USER_EMAIL,NF_TIME_ID)
  }).catch((response)=>{
    res.json(response)
  })

})

registerRouter.get('/verifyEmail',(req,res)=>{

  // 앱 초기화면으로 이동.
  // nonformalUsers 컬렉션 다큐먼트를 formalUsers 컬렉션으로 이동. 
  let TIMEID = req.query.timeid

  let DB_Machine = new MonDB()
  DB_Machine.MOVE_NONFORMAL_TO_FORMAL(TIMEID,secret.MongoCollections.nonformalUsers,secret.MongoCollections.formalUsers).then(()=>{
    console.log("이메일 인증에 성공.")
    res.header('Set-Cookie','abcd');
    res.redirect('http://localhost:9000/')
  }).catch((res)=>{
    console.log(res.mesg)
  })

})

const getExt = (mime) => {
  let text = mime.split('/')
  return text[1]
}


module.exports = registerRouter