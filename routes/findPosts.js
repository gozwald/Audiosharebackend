var express = require("express");
var router = express.Router();
const audioShareAudio = require("../models/audioShareAudio");

router.post("/", (req, res, next) => {
  const { location } = req.body;
  const distanceInKilometer = 1;
  const radius = distanceInKilometer / 6378.1;

  audioShareAudio
    .find({
      location: { $geoWithin: { $centerSphere: [location, radius] } },
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
