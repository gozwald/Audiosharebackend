const express = require("express");
const router = express.Router();
const audioShareUser = require("../audioShareUser");
const jwt = require("jsonwebtoken");

router.post("/", function (req, res, next) {
  const { username, password } = req.body;
  audioShareUser
    .findOne({ username }, "password")
    .then((doc) => {
      if (doc.password === password) {
        jwt.sign({ username }, "bleeeblaaablooo", function (err, token) {
          res.cookie("token", token).send("cookie set and logged in");
        });
      } else res.send("wrong password");
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
