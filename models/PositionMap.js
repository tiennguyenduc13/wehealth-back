const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PositionMap = new Schema(
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
    position: {
      lat: Number,
      lng: Number,
    },
  },
  {
    collection: "position-map",
  }
);

module.exports = mongoose.model("PositionMap", PositionMap);
