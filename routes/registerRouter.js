let express = require('express')
let registerRouter = express.Router()
let bodyParser = require('body-parser')
let fs = require('fs')
let formidable = require('formidable')

let shajs = require('sha.js')
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


  

  

  // let NF_USER_EMAIL = req.body.EMAIL
  // let NF_USER_USERNAME = req.body.USERNAME
  // let NF_USER_PW = req.body.PW
  // // Hashed Password
  // let hashedPW = shajs('sha256').update(NF_USER_PW).digest('hex')  

  // let expireAt = new Date()
  
  // MonDB.INSERT_TO_NON_FORMAL_USERS({
  //   EMAIL : NF_USER_EMAIL,
  //   USERNAME : NF_USER_USERNAME,
  //   PW : hashedPW,
  //   U_IMG_PATH : "",
  //   expire : expireAt
  // })

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

const getExt = (mime) => {
  let text = mime.split('/')
  return text[1]
}
const getFilename = (name) => {
  let text = name.split('.')
  return text[0]
}

module.exports = registerRouter