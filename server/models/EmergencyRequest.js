const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    emergencyType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);