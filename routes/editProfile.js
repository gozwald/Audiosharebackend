var express = require("express");
var router = express.Router();
const audioShareUser = require("../models/audioShareUser");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const storage = new Storage();

let bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

router.post("/", (req, res, next) => {
  // const { email } = req.decoded;
  const { first, last, password, bio, newEmail, email } = req.body;

  try {
    if (!req.file) {
      profileUpdate();
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

      profileUpdate(publicUrl);

      // Return the file name and its public URL
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(req.file.buffer);
  } catch (error) {
    res.status(400).json(`Error, could not upload file: ${error}`);
    return;
  }

  function profileUpdate(url) {
    bcrypt.hash(password, 10, (err, hash) => {
      const updatedProfile = audioShareUser.findOneAndUpdate(
        { email: email },
        {
          ...(first && { first: first }),
          ...(last && { last: last }),
          ...(newEmail && { newEmail: newEmail }),
          ...(password && { password: hash }),
          ...(bio && { bio: bio }),
          ...(url && { pic: url }),
        },
        {
          new: true,
        }
      );
      updatedProfile.exec(function (error, document) {
        if (error) console.error(error), res.json("something went wrong...");
        else
          console.log(document),
            res.status(200).json({
              msg: "profile updated",
            });
      });
    });
  }
});

module.exports = router;
