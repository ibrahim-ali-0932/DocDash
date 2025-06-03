const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: { type: String , ref: "User", required: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
