let express = require('express')
let cors = require('cors')
let path = require('path')
let app = express()

let loginRouter = require('./routes/loginRouter.js')
let registerRouter = require('./routes/registerRouter.js')

app.use(cors())

app.use('/login',loginRouter)
app.use('/register',registerRouter)

app.listen(3000,()=>{
  console.log('3000 go')
})