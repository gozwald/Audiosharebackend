const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const audioShareSchema = new Schema({
  username: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("AudShare", audioShareSchema);
