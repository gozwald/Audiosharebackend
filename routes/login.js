const express = require("express");
const router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", function (req, res, next) {
  const { email, password } = req.body;
  audioSharePost.users
    .findOne({ email }, "password")
    .then((doc) => {
      if (!doc) {
        res.sendStatus(401);
      } else {
        bcrypt.compare(password, doc.password, (err, result) => {
          if (result === true) {
            jwt.sign({ email, _id: doc._id }, process.env.JWT_CRED, function (
              err,
              token
            ) {
              console.log("user logged in");
              res.status(200).json(token);
            });
          }
        });
      }
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

module.exports = router;
