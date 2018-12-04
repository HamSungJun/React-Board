const MongoClient = require('mongodb').MongoClient;
const secret = require('./secret.js')
const assert = require('assert');
const client = new MongoClient(secret.MongoURL,{
  server: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
});

class DB_Machine {

 INSERT_TO_NON_FORMAL_USERS(doc,res){

  client.connect((err) => {

    assert.equal(err,null)
    console.log("Connected successfully to server")

    const db = client.db(secret.MongoDB)

    db.collection(secret.MongoCollections.nonformalUsers).insertOne(doc,(err,result)=>{
      
      assert.equal(err,null)
      assert.equal(1,result.result.n)
      console.log(`Inserted 1 document into ${secret.MongoDB}.${secret.MongoCollections.nonformalUsers}`)
      client.close()
       
      res.json({
        status : 1
      }).end()

    })
    
  })   

 }

}

module.exports = new DB_Machine()