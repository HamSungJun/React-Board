let express = require('express')

let writeRouter = express.Router()
let bodyParser = require('body-parser')
let MonDB = require('../DB/MongoTransactions.js')
let formidable = require('formidable')
let path = require('path')
let fs = require('fs')

writeRouter.use(bodyParser.urlencoded({ extended: false }))
writeRouter.use(bodyParser.json())
writeRouter.use(bodyParser.text())

writeRouter.post('/imageUpload',(req,res) => {

  const uploadPath = path.join(process.cwd(),'public/','SharedImages/')

  let form = new formidable.IncomingForm()

  form.uploadDir = uploadPath
  form.encoding = 'utf-8'
  form.multiples = true
  form.type = true
  form.keepExtensions = true
  
  form.parse(req)

  GET_FILE_RENAMED(form,res)
  
})

writeRouter.post('/writeComplete',(req,res)=>{

  let doc = {
    POST_TITLE : req.body.POST_TITLE,
    POST_CONTENT : req.body.POST_CONTENT,
    AUTHOR : req.body.AUTHOR,
    U_IMG_PATH : req.body.U_IMG_PATH,
    EMAIL : req.body.EMAIL,
    POST_DATE : req.body.POST_DATE
  }
  
  doc.POST_DATE = new Date(doc.POST_DATE).toLocaleDateString('kr')

  let DB_Machine = new MonDB();
  
  DB_Machine.SAVE_USER_SHARED_POSTING(doc).then((response)=>{
    if(response.status === 1){
      res.json(response)
      res.end()
    }
  })

})

async function GET_FILE_RENAMED(form,res){

  let fileRenamed = await RENAME_FILE(form)

    res.json({
      loc : fileRenamed
    })
    res.end()
  
}

function RENAME_FILE(form){

  return new Promise((resolve,reject) => {

    form.on('file',(name,file)=>{

      console.log(file.path)
      console.log(file.name)
      console.log(form.uploadDir)
      console.log(file.lastModifiedDate)
  
      const newFileName = `React-Board_${new Date(file.lastModifiedDate).toJSON().substr(0,10).replace(/-/g,"")}_${new Date().getTime()}.${file.type.split("/")[1]}`
      const newPath = `${form.uploadDir}${newFileName}`
  
      fs.rename(file.path,newPath,(err)=>{
        if(err){throw err}
          resolve(newFileName) 
      })
      
    })

  })

}

module.exports = writeRouter