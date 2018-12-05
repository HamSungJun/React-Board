const MongoClient = require('mongodb').MongoClient;
const secret = require('./secret.js')
const assert = require('assert');

class DB_Machine {

 INSERT_NONFORMAL(document,collection,res){

  const client = new MongoClient(secret.MongoURL,{useNewUrlParser : true});

  client.connect((err) => {

    assert.equal(err,null)
    console.log("Connected successfully to server")

    const db = client.db(secret.MongoDB)

    db.collection(collection).insertOne(document,(err,result)=>{
      
      assert.equal(err,null)
      assert.equal(1,result.result.n)
      console.log(`Inserted 1 document into ${secret.MongoDB}.${collection}`)
      client.close()
       
      res.json({
        status : 1
      }).end()

    })
    
  })   

 }

 MOVE_NONFORMAL_TO_FORMAL(unique , base , target , res){

  const client = new MongoClient(secret.MongoURL,{useNewUrlParser : true});

  client.connect((err) => {
  
    assert.equal(err,null)
    console.log("Connected successfully to DB for moving documents.")
  
    const db = client.db(secret.MongoDB)
    
    db.collection(base).find({"TIMEID" : unique}).project({"EMAIL" : 1 , "USERNAME" : 1 , "PW" : 1 , "U_IMG_PATH" : 1}).toArray((err,docs)=>{
      assert.equal(err,null)
      
      let FORMAL_USER_DOC = Object.assign({},docs[0],{
        REG_DATE : new Date().toLocaleDateString('kr'),
        NUM_OF_ARTICLES : 0,
        NUM_OF_REPLIES : 0,
        NUM_OF_GOTTEN_RECOMMENDS : 0,
        NUM_OF_HIT_RECOMMENDS : 0
      })


      db.collection(target).insertOne(FORMAL_USER_DOC,(err,result)=>{
        assert.equal(err,null)
        assert.equal(1,result.insertedCount)
        
        db.collection(base).deleteOne({"TIMEID" : unique},(err)=>{
          assert.equal(err,null)
          client.close()

          res.end()
        })

      })
      
    })
  
  })    

}

}

module.exports = DB_Machine