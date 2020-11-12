var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const socketApi = require("../socketAPI");

router.put("/", async (req, res, next) => {
  const { _id: mongouserid } = req.decoded;
  const { options } = req.body;

  if (options === "read") {
    await audioSharePost.feed
      .updateMany({ user: mongouserid, read: false }, { $set: { read: true } })
      .exec();

    const feed = await audioSharePost.feed
      .find({
        user: mongouserid,
      })
      .sort({ createdAt: "desc" })
      .select("-user")
      .populate("item.user");

    res.status(200).json(feed);
  }

  if (options === "view") {
    const feed = await audioSharePost.feed
      .find({
        user: mongouserid,
        read: false,
      })
      .select("-user");

    res.status(200).json(feed);
  }
});

module.exports = router;
