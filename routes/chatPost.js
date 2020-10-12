var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", function (req, res, next) {
  // const { username } = req.decoded;
  const { id, message, email } = req.body;

  const runCode = async () => {
    const post = await audioSharePost.audioPost.findOne({ _id: id });

    post.chats.push({
      message: message,
      email: email,
    });

    post
      .save()
      .then((e) => res.json(e), io.emit(id, { message, username }))
      .catch((error) => {
        console.error(error), res.json("something is missing...");
      });
  };

  runCode();
});

module.exports = router;
