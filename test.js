let sha3_256 = require('js-sha3').sha3_256
const MongoClient = require('mongodb').MongoClient;
const secret = require('./DB/secret.js')
const assert = require('assert');

console.log(new Date().toLocaleDateString('kr'))