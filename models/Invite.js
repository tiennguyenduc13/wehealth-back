const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Invite = new Schema(
  {
    inviterId: {
      type: String,
    },
    inviterEmail: {
      type: String,
    },
    inviteDate: {
      type: Date,
    },
    acceptDate: {
      type: Date,
    },
    orgId: {
      type: String,
    },
    inviteText: {
      type: String,
    },
    inviteStatus: {
      type: String,
    },
    inviteeId: {
      type: String,
    },
    inviteeEmail: {
      type: String,
    },
  },
  {
    collection: "invite",
  }
);

module.exports = mongoose.model("Invite", Invite);
