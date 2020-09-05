const express = require("express");
const router = express.Router();
const audioShareUser = require("../models/audioShareUser");

router.post("/", function (req, res, next) {
  const { username, email, password } = req.body;
  const newUser = new audioShareUser({
    username: username,
    password: password,
    email: email,
  });
  newUser.save(function (error, document) {
    if (error) console.error(error), res.send("something went wrong...");
    else console.log(document), res.send(document);
  });
});

module.exports = router;
