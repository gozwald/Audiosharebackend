var express = require("express");
var router = express.Router();
const audioShareAudio = require("../models/audioShareAudio");

router.post("/", (req, res, next) => {
  const { location } = req.body;
  const distanceInKilometer = 1;
  const radius = distanceInKilometer / 6378.1;
  const finalResult = [];

  audioShareAudio.audioPost
    .find({
      location: { $geoWithin: { $centerSphere: [location, radius] } },
    })
    .then((result) => {
      result.map((results, i, arr) => {
        audioShareAudio.chatPost.find({ audioId: results._id }).then((e) => {
          finalResult.push({ results, e });
          if (arr.length - 1 === i) {
            res.status(200).json(finalResult);
          }
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
