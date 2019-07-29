let express = require('express')

let readRouter = express.Router()
let MonDB = require('../DB/MongoTransactions.js')
let path = require('path')
let fs = require('fs')

readRouter.get('/',(req,res) => {

    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit)
    console.log(skip,limit)
    let DB_Machine = new MonDB()
    DB_Machine.GET_READABLE_DOCS(skip,limit).then(response => {
        if(response.status === 1){
            return res.json(response).end()
        }
    })

})

readRouter.get('/getContentById',(req,res) => {

    let DB_Machine = new MonDB()
    DB_Machine.GET_CONTENT_BY_ID(req.query._id).then(response => {
        if(response.status === 1){
            return res.json(response).end()
        }
    })

})

module.exports = readRouter