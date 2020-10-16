const express = require("express");
const router = express.Router();
const audioShareUser = require("../models/audioShareUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", function (req, res, next) {
  const { email, password } = req.body;
  audioShareUser
    .findOne({ email }, "password")
    .then((doc) => {
      bcrypt.compare(password, doc.password, (err, result) => {
        if (result === true) {
          jwt.sign({ email }, process.env.JWT_CRED, function (err, token) {
            console.log("user logged in");
            res.status(200).json(token);
          });
        } else res.sendStatus(401);
      });
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error(err);
    });
});

module.exports = router;
