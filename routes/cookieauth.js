const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const audioSharePost = require("../models/audioShareAudio");

router.post("/", function (req, res, next) {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_CRED, (err, decoded) => {
      if (decoded) {
        const getUserData = audioSharePost.users
          .findOne({ email: decoded.email })
          .select(["-password", "-email"]);
        getUserData.exec(function (error, userData) {
          if (error) console.error(error), res.json("something went wrong...");
          else res.status(200).json(userData);
        });
      } else {
        res.status(401).json("unauthorized token");
      }
    });
  }
});

module.exports = router;
