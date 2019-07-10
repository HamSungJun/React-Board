const MongoClient = require('mongodb').MongoClient;
const secret = require('./secret.js')
const assert = require('assert');

class DB_Machine {

 INSERT_NONFORMAL(document,collection){

  // 정식 유저에 이미 이메일이 존재하는지 확인
  // 이미 이메일이 존재하면 오류 상태 전송
  // 그렇지 안다면 비정식 유저 가입 진행

  return new Promise((resolve,reject)=>{

    const client = new MongoClient(secret.MongoURL,{useNewUrlParser : true});

    client.connect((err) => {

      assert.equal(err,null)

      if(err){
        reject({
          status : 0,
          mesg : "DB 클라이언트 연결 에러."
        })
      }

      const db = client.db(secret.MongoDB)
      
      db.collection(secret.MongoCollections.formalUsers).find({EMAIL : document.EMAIL}).count((err,count) => {
        assert.equal(err,null)
        
        if(count >= 1){
          reject({
            status : 0,
            mesg : "이미 해당 메일로 가입되어 있습니다."
          })
        }
        else{
          db.collection(collection).insertOne(document,(err,result)=>{
        
            assert.equal(err,null)
            assert.equal(1,result.result.n)
            console.log(`Inserted 1 document into ${secret.MongoDB}.${collection}`)
            client.close()
            
            if(err){
              reject({
                status : 0,
                mesg : "다큐먼트 삽입과정에서 오류발생."
              })
            }
            else{

              resolve({
                status : 1,
              })

            }

          })
        }
      })
  
    })
    
  })

 }

 MOVE_NONFORMAL_TO_FORMAL(unique , base , target){

  return new Promise((resolve , reject) => {

    const client = new MongoClient(secret.MongoURL,{useNewUrlParser : true});

    client.connect((err) => {
      
      assert.equal(err,null)
      
      if(err){
        reject({
          status : 0,
          mesg : "DB 클라이언트 연결 에러."
        })
      }

      const db = client.db(secret.MongoDB)
      
      db.collection(base).find({"TIMEID" : unique}).project({"EMAIL" : 1 , "USERNAME" : 1 , "PW" : 1 , "U_IMG_PATH" : 1}).toArray((err,docs)=>{
        assert.equal(err,null)
        
        if(err){
          reject({
            status : 0,
            mesg : "DB 비정식유저 쿼리 과정에서 에러."
          })
        }

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
          
          if(err){
            reject({
              status : 0,
              mesg : "DB 다큐먼트를 새로운 컬렉션으로 이동중에 에러."
            })
          }else{
            resolve({
              status : 1,
            })
          }

            db.collection(base).deleteOne({"TIMEID" : unique},(err)=>{
              assert.equal(err,null)

              if(err){
                reject({
                  status : 0,
                  mesg : "기존 컬렉션에서 다큐먼트를 삭제중에 에러."
                })
              }

              client.close()

              
            })

        })
        
      })
  
  })    

  })

}

FORMAL_USER_AUTHENTICATION(email,pw){

  return new Promise((resolve , reject) => {

    const client = new MongoClient(secret.MongoURL,{useNewUrlParser : true});

    client.connect((err) => {
  
    assert.equal(err,null)
    
    if(err){
      reject({
        status : 0,
        mesg : "DB 클라이언트 연결 에러."
      })
    }

    const db = client.db(secret.MongoDB)
    
    db.collection(secret.MongoCollections.formalUsers).find({EMAIL : email , PW : pw}).toArray((err , docs) => {

      assert.equal(err,null)

      // console.log(docs)

      if(docs.length === 1){

        resolve({
          status : 1,
          USERNAME : docs[0].USERNAME,
          U_IMG_PATH : docs[0].U_IMG_PATH,
          REG_DATE : docs[0].REG_DATE,
          NUM_OF_ARTICLES : docs[0].NUM_OF_ARTICLES,
          NUM_OF_REPLIES : docs[0].NUM_OF_REPLIES,
          NUM_OF_GOTTEN_RECOMMENDS : docs[0].NUM_OF_GOTTEN_RECOMMENDS,
          NUM_OF_HIT_RECOMMENS : docs[0].NUM_OF_HIT_RECOMMENDS,
          EMAIL : email
        })

      }
      else{
        reject({
          status : 0,
          mesg : "formalUsers 컬렉션에서 정상적으로 쿼리되지 않습니다."
        })
      }
      
          
    })
      
    })

  })

}

GET_USER_DATA_FROM_FORMALUSERS(email){

  console.log("세션을 통해 유저정보를 받아올게요")

  return new Promise((resolve,reject) => {

    const client = new MongoClient(secret.MongoURL,{useNewUrlParser : true});
    
    client.connect((err) => {

      assert.equal(err,null)
    
      if(err){
        console.log(err)
        reject({
          status : 0,
          mesg : "DB 클라이언트 연결 에러."
        })
      }

      const db = client.db(secret.MongoDB)
    
    db.collection(secret.MongoCollections.formalUsers).find({EMAIL : email}).toArray((err , docs) => {

      assert.equal(err,null)
      if(err){
        console.log(err)
      }
      console.log(docs)

      if(docs.length === 1){

        resolve({
          status : 1,
          USERNAME : docs[0].USERNAME,
          U_IMG_PATH : docs[0].U_IMG_PATH,
          REG_DATE : docs[0].REG_DATE,
          NUM_OF_ARTICLES : docs[0].NUM_OF_ARTICLES,
          NUM_OF_REPLIES : docs[0].NUM_OF_REPLIES,
          NUM_OF_GOTTEN_RECOMMENDS : docs[0].NUM_OF_GOTTEN_RECOMMENDS,
          NUM_OF_HIT_RECOMMENS : docs[0].NUM_OF_HIT_RECOMMENDS,
          EMAIL : email
        })

      }
      else{
        reject({
          status : 0,
          mesg : "formalUsers 컬렉션에서 정상적으로 쿼리되지 않습니다."
        })
      }
      
    })


    })

  })
}

SAVE_USER_SHARED_POSTING(doc){

  return new Promise((resolve,reject) => {

    const client = new MongoClient(secret.MongoURL,{useNewUrlParser : true});

    client.connect((err) => {

      assert.equal(err,null)

      if(err){
        console.log(err)
        reject({
          status : 0,
          mesg : "DB 클라이언트 연결 에러."
        })
      }

      const db = client.db(secret.MongoDB)

      db.collection(secret.MongoCollections.sharedPostings).insertOne(doc,(err,result) => {

        assert.equal(err,null)
        assert.equal(1,result.insertedCount)

        if(err){
          reject({
            status : 0,
            mesg : "유저 포스팅 삽입중 에러"
          })
        }else{
          resolve({
            status : 1,
          })
        }

        client.close()

      })


    })


  })

}

}

module.exports = DB_Machine
