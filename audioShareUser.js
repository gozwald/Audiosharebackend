const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true },
});

module.exports = mongoose.model("AudShareUser", userSchema);
