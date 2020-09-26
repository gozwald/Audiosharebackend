const mongoose = require("mongoose");

const Comments = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
    chats: [Comments],
  },
  {
    timestamps: true,
  }
);

const audioPost = mongoose.model("AudShareAudio", audioSchema);

const audioShareChat = mongoose.Schema(
  {
    audioId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    message: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const chatPost = mongoose.model("AudShareChat", audioShareChat);

module.exports = {
  audioPost,
  chatPost,
};
