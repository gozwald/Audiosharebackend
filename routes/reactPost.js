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

    !reactId
      ? find.react.push({
          user: mongouserid,
        })
      : find.react.pull(reactId._id);

    const save = await find.save();
    const populated = await save.execPopulate("user chats.user react.user");
    io.emit(id, populated);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
