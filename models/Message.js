const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Message = new Schema(
  {
    userId: {
      type: String,
    },
    userName: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    orgId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    collection: "message",
  }
);

module.exports = mongoose.model("Message", Message);
