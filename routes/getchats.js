var express = require("express");
var router = express.Router();
const audioShareAudio = require("../models/audioShareAudio");

router.put("/", (req, res, next) => {
  const { id } = req.body;

  audioShareAudio.audioPost
    .findOne({ _id: id })
    .sort("-date")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
