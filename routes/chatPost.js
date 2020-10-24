var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", async function (req, res, next) {
  const { _id } = req.decoded;
  const { id, message } = req.body;

  const post = await audioSharePost.audioPost.findOne({ _id: id });

  await post.chats.push({
    message: message,
    user: _id,
  });

  await post.save();

  await post.execPopulate("user chats.user");
  io.emit(id, post.chats);
});

module.exports = router;
