var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", async (req, res, next) => {
  const { _id: mongouserid } = req.decoded;
  const { id, message } = req.body;

  const post = await audioSharePost.audioPost.findOne({ _id: id });

  post.chats.push({
    message: message,
    user: mongouserid,
  });

  const save = await post.save();

  const populated = await save.execPopulate("user chats.user react.user");
  io.emit(id, populated);
  res.sendStatus(200);
});

module.exports = router;
