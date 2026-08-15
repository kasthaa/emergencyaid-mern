const express = require("express");
const router = express.Router();

const EmergencyRequest = require("../models/EmergencyRequest");

// Get all emergency requests
router.get("/", async (req, res) => {
  try {
    const requests = await EmergencyRequest.find();

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch emergency requests",
      error: error.message
    });
  }
});

// Create emergency request
router.post("/", async (req, res) => {
  try {
    const emergencyRequest = new EmergencyRequest(req.body);

    const savedRequest = await emergencyRequest.save();

    res.status(201).json({
      message: "Emergency request created successfully",
      request: savedRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create emergency request",
      error: error.message,
    });
  }
});

module.exports = router;