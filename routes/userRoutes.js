const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register
router.post("/register", async (req, res) => {
  const { fname, lname, email, pswd } = req.body;

  console.log("📨 Incoming register request:", req.body); // Debug log

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      console.log("⚠️ Email already exists");
      return res.status(409).send("Email already exists");
    }

    const user = new User({ fname, lname, email, pswd });
    const saved = await user.save();

    console.log("✅ User saved:", saved);
    res.send("Registered successfully");
  } catch (err) {
    console.error("❌ Error registering user:", err);  // See this in terminal
    res.status(500).send("Error registering user");
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, pswd } = req.body;
  try {
    const user = await User.findOne({ email, pswd });
    if (!user) return res.status(401).send("Invalid credentials");
    res.json({ message: "Login successful", userId: user._id });
  } catch (err) {
    res.status(500).send("Login failed");
  }
  console.log(" Login attempt:", req.body);
});

module.exports = router;
