var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", async (req, res, next) => {
  try {
    const { _id: mongouserid } = req.decoded;
    const { id } = req.body;

    const post = await audioSharePost.audioPost.findOne({ _id: id });

    if (
      !post.react.find((e) => toString(e.user._id) === toString(mongouserid))
    ) {
      post.react.push({
        user: mongouserid,
      });
      const save = await post.save();
      const populated = await save.execPopulate("user chats.user react.user");
      io.emit(id, populated);
      res.sendStatus(200);
    } else {
      const find = await audioSharePost.audioPost
        .findOne({ _id: id })
        .select({ "react._id": mongouserid });

      const update = await audioSharePost.audioPost.findOneAndUpdate(
        { _id: id },
        { $pull: { react: { _id: find.react[0]._id } } },
        { new: true }
      );

      const save = await update.save();
      const populated = await save.execPopulate("user chats.user react.user");

      io.emit(id, populated);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
