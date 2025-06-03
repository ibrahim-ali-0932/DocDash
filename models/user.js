const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: { type: String, unique: true },
  pswd: String
});

module.exports = mongoose.model("User", userSchema);
