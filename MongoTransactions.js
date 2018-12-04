const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const DB_board = 'board';
const client = new MongoClient(url);

const DB_Colletions = {
  article : "article",
  formalUsers : "formalUsers",
  nonformalUsers : "nonformalUsers",
}

class DB_Machine {

 INSERT_TO_NON_FORMAL_USERS(doc){

  client.connect((err) => {

    assert.equal(err,null)
    console.log("Connected successfully to server")

    const db = client.db(DB_board)

    db.collection(DB_Colletions.nonformalUsers).insertOne(doc,(err,result)=>{
      
      console.log(doc)
      assert.equal(err,null)
      assert.equal(1,result.result.n)
      console.log(`Inserted 1 document into ${DB_board}.${DB_Colletions.nonformalUsers}`)
      client.close()
      
    })
    
  })   

 }

}

module.exports = new DB_Machine();