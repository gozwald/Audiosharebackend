const express = require("express");
const router = express.Router();
const audioSharePost = require("../models/audioShareAudio");

router.post("/", function (req, res, next) {
  const { username } = req.decoded;
  audioSharePost
    .find({ username })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
