var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", async (req, res, next) => {
  try {
    const { _id: mongouserid } = req.decoded;
    const { id } = req.body;

    const find = await audioSharePost.audioPost.findOne({
      _id: id,
    });

    const reactId = find.react.find(({ user }) => user == mongouserid);

    if (!reactId) {
      find.react.push({
        user: mongouserid,
      });
      if (find.user != mongouserid) {
        const feed = new audioSharePost.feed({
          user: find.user,
          type: "react",
          item: {
            user: mongouserid,
          },
          postlocator: { _id: find._id, location: find.location.coordinates },
          read: false,
        });

        feed.save();
      }
    } else {
      if (find.user != mongouserid) {
        audioSharePost.feed
          .findOneAndDelete({
            user: find.user,
            "item.user": mongouserid,
            type: "react",
            "postlocator._id": find._id,
          })
          .exec();
      }
      find.react.pull(reactId._id);
    }

    const save = await find.save();

    const populated = await save.execPopulate("user chats.user react.user");
    io.emit(id, populated);

    const updatedFeed = await audioSharePost.feed
      .find({ user: populated.user._id })
      .populate("user item.user")
      .sort({ createdAt: "desc" });
    io.emit(populated.user._id, updatedFeed);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
