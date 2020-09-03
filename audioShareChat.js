const mongoose = require("mongoose");

const audioShareChat = mongoose.Schema(
  {
    audioId: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
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

module.exports = mongoose.model("audShareChat", messageSchema);
