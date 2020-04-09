const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Org
let Org = new Schema(
  {
    creatorId: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    members: {
      type: [String],
    },
  },
  {
    collection: "org",
  }
);

module.exports = mongoose.model("Org", Org);
