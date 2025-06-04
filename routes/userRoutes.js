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
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.pswd !== pswd) return res.status(401).json({ message: "Invalid password" });

    // If matched, send user info (without password)
    const { _id, fname, lname } = user;
    res.status(200).json({ userId: _id, fname, lname, email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
//user check
router.post("/check-email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.json({ exists: true, user });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ exists: false, error: "Server error" });
  }
});
// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
