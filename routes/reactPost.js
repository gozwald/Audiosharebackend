var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", async (req, res, next) => {
  try {
    const { _id: mongouserid } = req.decoded;
    const { id } = req.body;

    let find = await audioSharePost.audioPost
      .findOne({ _id: id })
      .select({ "react._id": mongouserid });

    if (!find.react.length) {
      find = await audioSharePost.audioPost.findOne({ _id: id });
      find.react.push({
        user: mongouserid,
      });
    } else {
      find = await audioSharePost.audioPost.findOneAndUpdate(
        { _id: id },
        { $pull: { react: { _id: find.react[0]._id } } },
        { new: true }
      );
    }
    const save = await find.save();
    const populated = await save.execPopulate("user chats.user react.user");
    io.emit(id, populated);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
