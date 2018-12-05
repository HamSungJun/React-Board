let express = require('express')
let registerRouter = express.Router()
let bodyParser = require('body-parser')
let fs = require('fs')
let formidable = require('formidable')
let sha256 = require('js-sha3').sha3_256
let MonDB = require('../DB/MongoTransactions.js')
let nodemailer = require('nodemailer')
let secret = require('../DB/secret')

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
  
  nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: secret.mailerConfig.host,
        port: secret.mailerConfig.port,
        secure: secret.mailerConfig.secure,
        auth: {
            user: secret.mailerConfig.user,
            pass: secret.mailerConfig.password
        }
    });

    // Message object
    let message = {
        from: `ReactBoard <tjdwns5123@gmail.com>`,
        to: NF_USER_EMAIL,
        subject: '게시판 가입인증 메일입니다.',
        html: 
        `
        <div>
          <header>
            <h2>React Borad</h2>
          </header>
          <section>
            <p>
              해당 <a href="http://localhost:3000/register/verifyEmail?timeid=${NF_TIME_ID}">링크</a>를 클릭하여 가입을 완료하여 주십시오.
            </p>
          </section>          
        </div>
        `
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

  });

  let DB_Machine = new MonDB();

  DB_Machine.INSERT_NONFORMAL({
    TIMEID : NF_TIME_ID,
    EMAIL : NF_USER_EMAIL,
    USERNAME : NF_USER_USERNAME,
    PW : sha256(NF_USER_PW),
    U_IMG_PATH : `./public/UserImages/${NF_FILE_NAME}`,
    createdAt : createdAt
  },secret.MongoCollections.nonformalUsers,res)

})

registerRouter.get('/verifyEmail',(req,res)=>{

  // 앱 초기화면으로 이동.
  // nonformalUsers 컬렉션 다큐먼트를 formalUsers 컬렉션으로 이동. 
  let TIMEID = req.query.timeid

  let DB_Machine = new MonDB()
  DB_Machine.MOVE_NONFORMAL_TO_FORMAL(TIMEID,secret.MongoCollections.nonformalUsers,secret.MongoCollections.formalUsers,res)

  res.redirect('http://localhost:9000/')

})

const getExt = (mime) => {
  let text = mime.split('/')
  return text[1]
}


module.exports = registerRouter