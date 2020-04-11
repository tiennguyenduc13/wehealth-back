// Business.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Business = new Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
  },
  {
    collection: "business",
  }
);

module.exports = mongoose.model("Business", Business);
