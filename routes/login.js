var express = require("express");
var router = express.Router();
const audioShareUser = require("../audioShareUser");

router.post("/", function (req, res, next) {
  const { username, password } = req.body;

  audioShareUser
    .findOne({ username }, "password")
    .then((doc) => {
      if (doc.password === password) res.send("logged in");
      else res.send("wrong password");
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
