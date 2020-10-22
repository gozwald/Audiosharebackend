var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

const storage = new Storage();

let bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

router.post("/", (req, res, next) => {
  const { _id } = req.decoded;
  const { location } = req.body;

  console.log(_id);

  try {
    if (!req.file) {
      res.status(400).json("Error, could not upload file");
      return;
    }

    // Create new blob in the bucket referencing the file

    const blob = bucket.file(uuidv4());

    // Create writable stream and specifying file mimetype
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWriter.on("error", (err) => next(err));

    blobWriter.on("finish", () => {
      // Assembling public URL for accessing the file via HTTP
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURI(blob.name)}?alt=media`;

      // Return the file name and its public URL
      const newAudio = new audioSharePost.audioPost({
        audioContent: publicUrl,
        location: JSON.parse(location),
        user: _id,
      });
      newAudio.save(function (error, document) {
        if (error) console.error(error), res.json("something went wrong...");
        else
          console.log(document),
            res.status(200).json({
              msg: "saved to db and uploaded!",
              url: publicUrl,
              location: JSON.parse(location),
            });
      });
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  } catch (error) {
    res.status(400).json(`Error, could not upload file: ${error}`);
    return;
  }
});

module.exports = router;
