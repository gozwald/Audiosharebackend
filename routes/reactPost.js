var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
var socketApi = require("../socketAPI");
var io = socketApi.io;

router.put("/", async (req, res, next) => {
  try {
    const { _id: mongouserid } = req.decoded;
    const { id } = req.body;

    // let testQ = await audioSharePost.audioPost.findOne(
    //   {
    //     _id: id,
    //   },
    //   {
    //     react: {
    //       $elemMatch: { user: mongouserid },
    //     },
    //   }
    // );

    // console.log(testQ);

    let find = await audioSharePost.audioPost.findOne({
      _id: id,
    });

    const pos = find.react.map((e) => e.user).indexOf(mongouserid);
    const subid = find.react[pos];

    pos === -1
      ? find.react.push({
          user: mongouserid,
        })
      : find.react.pull(subid);

    const save = await find.save();
    const populated = await save.execPopulate("user chats.user react.user");
    io.emit(id, populated);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
