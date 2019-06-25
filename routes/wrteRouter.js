let express = require('express')

let writeRouter = express.Router()
let bodyParser = require('body-parser')
let MonDB = require('../DB/MongoTransactions.js')

writeRouter.use(bodyParser.urlencoded({ extended: false }))
writeRouter.use(bodyParser.json())

writeRouter.post('/imageUpload',(req,res) => {

  console.log(req.body)

})

module.exports = writeRouter