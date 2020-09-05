const express = require("express");
const router = express.Router();
const jwtDecode = require("jwt-decode");
const audioShareUser = require("../models/audioShareUser");

router.post("/", function (req, res, next) {
  const decoded = jwtDecode(req.cookies.token);
  const { username } = decoded;
  audioShareUser
    .findOne({ username })
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
