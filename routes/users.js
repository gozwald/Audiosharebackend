var express = require("express");
var router = express.Router();
const AudioShare = require("../audioShareSchema");

router.get("/", function (req, res, next) {
  const newUser = new AudioShare({
    username: "Ryu",
    password: "Shinku Hadoken",
    email: "blah",
  });
  newUser.save(function (error, document) {
    if (error) console.error(error);
    console.log(document);
  });
});

module.exports = router;
