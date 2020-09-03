var express = require("express");
var router = express.Router();
const audioSharePost = require("../audioShareAudio");

router.put("/", function (req, res, next) {
  const { url, gps, user } = req.body;
  const newAudio = new audioSharePost({
    audioContent: url,
    gps: gps,
    user: user,
  });
  newAudio.save(function (error, document) {
    if (error) console.error(error), res.send("something went wrong...");
    else console.log(document), res.send(document);
  });
});

module.exports = router;
