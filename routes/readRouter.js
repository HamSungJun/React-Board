let express = require("express");

let readRouter = express.Router();
let MonDB = require("../DB/MongoTransactions.js");
let bodyParser = require("body-parser");
let path = require("path");
let fs = require("fs");

readRouter.use(bodyParser.urlencoded({ extended: false }));
readRouter.use(bodyParser.json());
readRouter.use(bodyParser.text());

readRouter.get("/", (req, res) => {
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  console.log(skip, limit);
  let DB_Machine = new MonDB();
  DB_Machine.GET_READABLE_DOCS(skip, limit).then(response => {
    if (response.status === 1) {
      return res.json(response).end();
    }
  });
});

readRouter.get("/getContentById", (req, res) => {
  let DB_Machine = new MonDB();
  DB_Machine.GET_CONTENT_BY_ID(req.query._id).then(response => {
    if (response.status === 1) {
      return res.json(response).end();
    }
  });
});

readRouter.post("/postReply", (req, res) => {
  let DB_Machine = new MonDB();
  let doc = {
    REPLY_AUTHOR: req.body.REPLY_AUTHOR,
    REPLY_AUTHOR_IMAGE: req.body.REPLY_AUTHOR_IMAGE,
    REPLY_AUTHOR_EMAIL: req.body.REPLY_AUTHOR_EMAIL,
    REPLY_CONTENT: req.body.REPLY_CONTENT,
    REPLY_DATE: parseInt(req.body.REPLY_DATE)
  };
  DB_Machine.POST_REPLY_BY_ID(req.body._id, doc).then(response => {
    if (response.status === 1) {
      return res.json(response).end();
    }
  });
});

readRouter.post("/deleteReply", (req, res) => {
  let DB_Machine = new MonDB();
  DB_Machine.DELETE_REPLY_BY_ID(
    req.body.targetArticleId,
    req.body.targetReplyId
  ).then(response => {
    if (response.status === 1) {
      return res.json(response).end();
    }
  });
});

readRouter.post("/recommendUp", (req, res) => {
  let DB_Machine = new MonDB();
  console.log(req.body);
  DB_Machine.RECOMMEND_UP_BY_EMAIL(
    req.body.targetArticleId,
    req.body.EMAIL
  ).then(response => {
    if (response.status === 1) {
      return res.json(response).end();
    }
  });
});

readRouter.put("/postEyeUp", (req, res) => {
  let DB_Machine = new MonDB();
  DB_Machine.POST_EYE_UP_BY_ID(req.body.targetArticleId).then(response => {
    if (response.status === 1) {
      return res.json(response).end();
    }
  });
});

module.exports = readRouter;
