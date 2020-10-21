const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

module.exports = mongoose.model("AudShareUser", userSchema);
