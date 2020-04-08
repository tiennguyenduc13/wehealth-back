const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Profile
let Profile = new Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    email: {
      type: String,
    },
    cellPhone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "na"],
      default: "na",
    },
  },
  {
    collection: "profile",
  }
);

module.exports = mongoose.model("Profile", Profile);
