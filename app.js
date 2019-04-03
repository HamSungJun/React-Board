
let express = require('express')
let cors = require('cors')
let app = express()


let loginRouter = require('./routes/loginRouter.js')
let registerRouter = require('./routes/registerRouter.js')

app.set('PORT',process.env.PORT || 3000)
app.use(cors())
app.use(express.static(__dirname))
app.use('/login',loginRouter)
app.use('/register',registerRouter)


app.listen(app.get('PORT'),()=>{
    console.log(`익스프레스 서버는 ${app.get('PORT')}번을 리스닝 합니다.`)
})
