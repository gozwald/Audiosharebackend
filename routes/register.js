const express = require("express");
const router = express.Router();
const audioShareUser = require("../models/audioShareUser");
const bcrypt = require("bcrypt");

router.post("/", function (req, res, next) {
  const { first, last, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    const newUser = new audioShareUser({
      first: first,
      last: last,
      email: email,
      password: password,
    });

    newUser.save(function (error, document) {
      if (error) console.error(error), res.json("something went wrong...");
      else console.log(document), res.json(document);
    });
  });
});

module.exports = router;
