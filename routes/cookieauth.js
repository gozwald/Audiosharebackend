const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", function (req, res, next) {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_CRED, (err, decoded) => {
      if (decoded) {
        res.status(200).json(decoded);
      } else {
        res.status(401).json("unauthorized token");
      }
    });
  }
});

module.exports = router;
