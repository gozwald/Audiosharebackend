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

  const feed = new audioSharePost.feed({
    user: save.user,
    type: "chat",
    item: save.chats[save.chats.length - 1],
  });

  const updatedfeed = await feed.save();
  const populatedfeed = await updatedfeed.execPopulate("user item.user");
  const populated = await save.execPopulate("user chats.user react.user");

  io.emit(id, populated);
  io.emit(mongouserid, populatedfeed);
  res.sendStatus(200);
});

module.exports = router;
