const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Invite = new Schema(
  {
    inviterId: {
      type: String,
    },
    inviteeId: {
      type: String,
    },
    inviteeEmail: {
      type: String,
    },
    eventDate: {
      type: Date,
    },
    inviteStatus: {
      type: String, //pending
    },
  },
  {
    collection: "invite",
  }
);

module.exports = mongoose.model("Invite", Invite);
