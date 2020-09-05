const mongoose = require("mongoose");

const audioSchema = mongoose.Schema(
  {
    audioContent: { type: String, required: true },
    gps: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("audShareAudio", audioSchema);
