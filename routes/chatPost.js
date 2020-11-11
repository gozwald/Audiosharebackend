const express = require("express");
const router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const socketApi = require("../socketAPI");
const io = socketApi.io;

router.put("/", async (req, res, next) => {
  try {
    const { _id: mongouserid } = req.decoded;
    const { id, message } = req.body;

    const post = await audioSharePost.audioPost.findOne({ _id: id });

    post.chats.push({
      message: message,
      user: mongouserid,
    });

    const save = await post.save();

    if (save.user != mongouserid) {
      const feed = new audioSharePost.feed({
        user: save.user,
        type: "chat",
        item: {
          message: save.chats[save.chats.length - 1].message,
          user: save.chats[save.chats.length - 1].user,
        },
        postlocator: { _id: save._id, location: save.location.coordinates },
        read: false,
      });

      feed.save();
    }

    if (save.user == mongouserid) {
      const uniqueItems = [
        ...new Set(
          save.chats
            .filter((e) => e.user != mongouserid)
            .map((e) => e.user.toString())
        ),
      ];

      if (uniqueItems.length) {
        uniqueItems.map(async (e) => {
          const feed = new audioSharePost.feed({
            user: e,
            type: "reply",
            item: {
              message: save.chats[save.chats.length - 1].message,
              user: save.chats[save.chats.length - 1].user,
            },
            postlocator: { _id: save._id, location: save.location.coordinates },
            read: false,
          });

          feed.save();
        });
      }
    }

    const populated = await save.execPopulate("user chats.user react.user");
    io.emit(id, populated);

    const updatedFeed = await audioSharePost.feed
      .find({ user: populated.user._id })
      .populate("user item.user");
    io.emit(populated.user._id, updatedFeed);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
