let express = require('express')
let loginRouter = express.Router()
let bodyParser = require('body-parser')
let shajs = require('sha.js')
let MonDB = require('../MongoTransactions.js')

loginRouter.use(bodyParser.urlencoded({ extended: false }))
loginRouter.use(bodyParser.json())

module.exports = loginRouter

