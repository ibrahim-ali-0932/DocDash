const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

router.post("/submit-feedback", async (req, res) => {
  const { userId, message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).send("Feedback message is required");
  }

  try {
    const feedback = new Feedback({
      userId: userId || null,
      message,
    });

    await feedback.save();
    res.status(200).send("Feedback submitted successfully");
  } catch (err) {
    console.error("❌ Feedback submission error:", err);
    res.status(500).send("Failed to submit feedback");
  }
});

module.exports = router;
