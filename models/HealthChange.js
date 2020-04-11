const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let HealthChange = new Schema(
  {
    userId: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    healthSignals: {
      type: [String],
    },
  },
  {
    collection: "health-change",
  }
);

module.exports = mongoose.model("HealthChange", HealthChange);
