const express = require("express");
const router = express.Router();
const audioShareUser = require("../models/audioShareUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", function (req, res, next) {
  const { username, password } = req.body;
  audioShareUser
    .findOne({ username }, "password")
    .then((doc) => {
      bcrypt.compare(password, doc.password, (err, result) => {
        if (result === true) {
          jwt.sign({ username }, "bleeeblaaablooo", function (err, token) {
            res.status(200).json(token);
          });
        } else res.json("wrong password");
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
