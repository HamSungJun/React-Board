let express = require('express')
let cors = require('cors')
let app = express()

let loginRouter = require('./routes/loginRouter.js')

app.use(cors())

app.use('/register',loginRouter)

app.listen(3000,()=>{
  console.log('3000 go')
})