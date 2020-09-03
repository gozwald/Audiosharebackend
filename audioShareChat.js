const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    audioId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: {
      text: { type: String, required: true },
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("audShareChat", MessageSchema);
