 const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/emergency", emergencyRoutes);

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "EmergencyAid backend is running",
  });
});

// ===============================
// MongoDB Connection
// ===============================

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  });