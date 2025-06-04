const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Docdash";

mongoose.connect(MONGODB_URI)
  .then(() => console.log(" MongoDB connected to Docdash"))
  .catch(err => console.error(" MongoDB connection error:", err));

// Routes   
const userRoutes = require("./routes/userRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use("/api/users", userRoutes);
app.use("/api/feedback", feedbackRoutes);

app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use 'smtp.ethereal.email' for dev
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "DocDash - Password Reset Request",
      text: "We've received your request. A reset link will be added soon.",
    });

    res.status(200).send("Email sent successfully");
  } catch (err) {
    console.error("❌ Email error:", err);
    res.status(500).send("Failed to send email");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
