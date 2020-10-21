const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comments = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // link: {
    //   type: Schema.Types.ObjectId,
    //   ref: "AudShareUser",
    // },
  },
  {
    timestamps: true,
  }
);

const audioSchema = new Schema(
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
    email: { type: String, required: true },
    chats: [Comments],
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  pic: { type: String },
  bio: { type: String },
});

const users = mongoose.model("AudShareUser", userSchema);
const audioPost = mongoose.model("AudShareAudio", audioSchema);

module.exports = {
  audioPost,
  users,
};
