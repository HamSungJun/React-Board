let express = require('express')
let registerRouter = express.Router()
let bodyParser = require('body-parser')
let fs = require('fs')
let formidable = require('formidable')

let sha256 = require('js-sha3').sha3_256
let MonDB = require('../MongoTransactions.js')

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

  console.log(req.body)

  let NF_USER_EMAIL = req.body.EMAIL
  let NF_USER_USERNAME = req.body.USERNAME
  let NF_FILE_NAME = req.body.FILENAME
  let NF_USER_PW = req.body.PW
  
  let expireAt = new Date()
  
  MonDB.INSERT_TO_NON_FORMAL_USERS({
    EMAIL : NF_USER_EMAIL,
    USERNAME : NF_USER_USERNAME,
    PW : NF_USER_PW,
    U_IMG_PATH : `./public/UserImages/${NF_FILE_NAME}`,
    expire : expireAt
  })

  res.send({
    status : 1
  })

})

const getExt = (mime) => {
  let text = mime.split('/')
  return text[1]
}

module.exports = registerRouter