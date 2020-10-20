const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const audioShareUser = require("../models/audioShareUser");

router.post("/", function (req, res, next) {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_CRED, (err, decoded) => {
      if (decoded) {
        const getUserData = audioShareUser
          .findOne({ email: decoded.email })
          .select(["-password", "-email"]);
        getUserData.exec(function (error, userData) {
          if (error) console.error(error), res.json("something went wrong...");
          else console.log(userData), res.status(200).json(userData);
        });
      } else {
        res.status(401).json("unauthorized token");
      }
    });
  }
});

module.exports = router;
