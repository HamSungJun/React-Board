
let express = require('express')
let session = require('express-session')
let app = express()
let loginRouter = require('./routes/loginRouter.js')
let registerRouter = require('./routes/registerRouter.js')
let writeRouter = require('./routes/wrteRouter.js')

let cors = require('cors');
const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));
app.set('PORT',process.env.PORT || 3000)
app.use(express.static('public'))
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

app.use('/write',writeRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)

app.listen(app.get('PORT'),()=>{
    console.log(`익스프레스 서버는 ${app.get('PORT')}번을 리스닝 합니다.`)
})
