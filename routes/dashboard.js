const express = require("express");
const router = express.Router();
const jwtDecode = require("jwt-decode");
const audioSharePost = require("../models/audioShareAudio");

router.post("/", function (req, res, next) {
  const decoded = jwtDecode(req.cookies.token);
  const { username } = decoded;
  audioSharePost
    .find({ username })
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
