var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");

router.put("/", function (req, res, next) {
  // const { username } = req.decoded;
  const { id, message, username } = req.body;

  // const chats = { usermame: username, message: message };

  const runCode = async () => {
    const post = await audioSharePost.audioPost.findOne({ _id: id });

    post.chats.push({
      message: message,
      username: username,
    });

    post
      .save()
      .then((e) => res.json(e))
      .catch((error) => {
        console.error(error), res.json("something is missing...")
      });
  };

  runCode();
});

module.exports = router;
