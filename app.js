
let express = require('express')
let session = require('express-session')
let app = express()
let loginRouter = require('./routes/loginRouter.js')
let registerRouter = require('./routes/registerRouter.js')
let writeRouter = require('./routes/writeRouter.js')
let fs = require('fs')
let path = require('path')

let cors = require('cors');
const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));
app.set('PORT',process.env.PORT || 3000)
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
   
    secret: 'HSJPRIME',
  
    resave: false,
  
    saveUninitialized: true,

    cookie: {
        httpOnly : false,
        secure: false,
        maxAge: 24 * 24 * 60 * 60 * 1000,
    }

}));

app.get('*',(req,res) => {
    
    fs.readFile(path.join(__dirname,'public', 'dist', 'index.html'),{
        encoding : "utf8"
    },(err , data) => {
        if(err){
            console.log(err)
        }
        res.send(data)
    })
    
})

app.use('/write',writeRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)

app.listen(app.get('PORT'),()=>{
    console.log(`익스프레스 서버는 ${app.get('PORT')}번을 리스닝 합니다.`)
})
