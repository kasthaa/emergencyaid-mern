require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const emergencyRoutes = require("./routes/emergencyRoutes");

app.use("/api/emergencies", emergencyRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "EmergencyAid API is running 🚑",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});