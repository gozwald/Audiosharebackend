const express = require("express");
const router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const socketApi = require("../socketAPI");
const io = socketApi.io;

router.put("/", async (req, res, next) => {
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
      item: save.chats[save.chats.length - 1],
      postlocator: { _id: save._id, location: save.location.coordinates },
    });

    const updatedfeed = await feed.save();
    const populatedfeed = await updatedfeed.execPopulate("user item.user");
    io.emit(save.user, populatedfeed);
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
          item: save.chats[save.chats.length - 1],
          postlocator: { _id: save._id, location: save.location.coordinates },
        });

        const updatedfeed = await feed.save();
        const populatedfeed = await updatedfeed.execPopulate("user item.user");
        io.emit(e, populatedfeed);
      });
    }
  }

  const populated = await save.execPopulate("user chats.user react.user");

  io.emit(id, populated);

  res.sendStatus(200);
});

module.exports = router;
