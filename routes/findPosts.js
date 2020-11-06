var express = require("express");
var router = express.Router();
const audioShareAudio = require("../models/audioShareAudio");

router.post("/", (req, res, next) => {
  const { location } = req.body;
  const distanceInKilometer = 100;
  const radius = distanceInKilometer / 6378.1;

  audioShareAudio.audioPost
    .find({
      location: { $geoWithin: { $centerSphere: [location, radius] } },
    })
    .select("location user")
    .populate("user")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
