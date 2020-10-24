const express = require("express");
const router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const bcrypt = require("bcrypt");

router.post("/", function (req, res, next) {
  const { first, last, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const newUser = new audioSharePost.users({
      first: first,
      last: last,
      email: email,
      password: hash,
    });

    newUser.save(function (error, document) {
      if (error)
        console.error(error),
          res
            .status(400)
            .json("Sorry! This email has already been registered!");
      else
        console.log(document),
          res
            .status(200)
            .json(
              "Welcome aboard " + document.first + "! Click below to login!"
            );
    });
  });
});

module.exports = router;
