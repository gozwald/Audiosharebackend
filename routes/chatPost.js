var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");

router.put("/", function (req, res, next) {
  // const { username } = req.decoded;
  const { id, message, username } = req.body;
  const newChat = new audioSharePost.chatPost({
    audioId: id,
    message: message,
    username: username,
  });
  newChat.save(function (error, document) {
    if (error) console.error(error), res.json("something went wrong...");
    else console.log(document), res.status(200).json(document);
  });
});

module.exports = router;
