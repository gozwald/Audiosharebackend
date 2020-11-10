const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comments = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "AudShareUser",
    },
  },
  {
    timestamps: true,
  }
);

const React = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "AudShareUser",
    },
    // type: {
    //   type: String,
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
    react: [React],
    chats: [Comments],
    user: {
      type: Schema.Types.ObjectId,
      ref: "AudShareUser",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const feedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AudShareUser",
    },
    type: {
      type: String,
      required: true,
    },
    item: {
      type: Schema.Types.Mixed,
      required: true,
      ref: "AudShareUser",
    },
    postlocator: {
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      location: {
        type: Array,
        required: true,
      },
    },
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

const feed = mongoose.model("AudShareFeed", feedSchema);
const users = mongoose.model("AudShareUser", userSchema);
const audioPost = mongoose.model("AudShareAudio", audioSchema);

module.exports = {
  audioPost,
  users,
  feed,
};
