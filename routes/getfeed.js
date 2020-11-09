var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const socketApi = require("../socketAPI");

router.put("/", async (req, res, next) => {
  const { _id: mongouserid } = req.decoded;

  const feed = await audioSharePost.feed
    .find({
      user: mongouserid,
    })
    .sort({ createdAt: "desc" })
    .select("-user")
    .populate("item.user");

  res.status(200).json(feed);
});

module.exports = router;
