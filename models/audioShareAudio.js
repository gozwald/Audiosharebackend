const mongoose = require("mongoose");

const audioSchema = mongoose.Schema(
  {
    audioContent: { type: String, required: true },
    gps: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("audShareAudio", audioSchema);
