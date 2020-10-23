var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", async function (req, res, next) {
  const { _id } = req.decoded;
  const { id, message } = req.body;

  const post = await audioSharePost.audioPost.findOne({ _id: id });

  post.chats.push({
    message: message,
    user: _id,
  });

  post
    .save()
    .then((e) => {
      res.json(e);
      io.emit(id, { message, _id });
    })
    .catch((error) => {
      console.error(error), res.json("something is missing...");
    });
});

module.exports = router;
