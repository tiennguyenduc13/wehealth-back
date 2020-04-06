const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Setting = new Schema(
  {
    userId: {
      type: String,
    },
    alertDistance: {
      enabled: {
        type: Boolean,
        default: false,
      },
      radius: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    collection: "setting",
  }
);

module.exports = mongoose.model("Setting", Setting);
