const mongoose = require("mongoose");

const audioShareChat = mongoose.Schema(
  {
    audioId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("audShareChat", audioShareChat);
