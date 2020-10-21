const { query } = require("express");
var express = require("express");
var router = express.Router();
const audioShareAudio = require("../models/audioShareAudio");
// const audioShareUser = require("../models/audioShareUser");

router.put("/", (req, res, next) => {
  const { id } = req.body;

  const query = audioShareAudio.audioPost
    .findOne({ _id: id })
    // .populate("email")
    .sort("-date");

  query.exec((err, e) => {
    console.log(e);
    res.json(e);
  });
});

module.exports = router;
