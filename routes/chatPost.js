var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", function (req, res, next) {
  const { email } = req.decoded;
  const { id, message } = req.body;

  const runCode = async () => {
    const post = await audioSharePost.audioPost.findOne({ _id: id });

    post.chats.push({
      message: message,
      email: email,
    });

    post
      .save()
      .then((e) => res.json(e), io.emit(id, { message, email }))
      .catch((error) => {
        console.error(error), res.json("something is missing...");
      });
  };

  runCode();
});

module.exports = router;
