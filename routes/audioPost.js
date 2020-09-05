var express = require("express");
var router = express.Router();
const jwtDecode = require("jwt-decode");
const audioSharePost = require("../models/audioShareAudio");

router.post("/", function (req, res, next) {
  const decoded = jwtDecode(req.cookies.token);
  const { username } = decoded;
  const { url, gps } = req.body;
  const newAudio = new audioSharePost({
    audioContent: url,
    gps: gps,
    username: username,
  });
  newAudio.save(function (error, document) {
    if (error) console.error(error), res.send("something went wrong...");
    else console.log(document), res.send(document);
  });
});

module.exports = router;
