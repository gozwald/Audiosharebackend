const mongoose = require("mongoose");

const audioSchema = mongoose.Schema(
  {
    audioContent: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("audShareAudio", audioSchema);
