var express = require("express");
var router = express.Router();
const audioSharePost = require("../models/audioShareAudio");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

let bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

router.post("/", uploader.single("audio"), async (req, res, next) => {
  const { username } = req.decoded;
  const { gps } = req.body;
  try {
    if (!req.file) {
      res.status(400).send("Error, could not upload file");
      return;
    }

    // Create new blob in the bucket referencing the file
    const blob = bucket.file(req.file.originalname);

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
      res
        .status(200)
        .send({ fileName: req.file.originalname, fileLocation: publicUrl });
      const newAudio = new audioSharePost({
        audioContent: publicUrl,
        gps: gps,
        username: username,
      });
      newAudio.save(function (error, document) {
        if (error) console.error(error), res.send("something went wrong...");
        else console.log(document);
      });
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  } catch (error) {
    res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }
});

module.exports = router;
