const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Setting
let Setting = new Schema(
  {
    userId: {
      type: String,
    },
    alertRadius: {
      type: Number,
    },
  },
  {
    collection: "setting",
  }
);

module.exports = mongoose.model("Setting", Setting);
