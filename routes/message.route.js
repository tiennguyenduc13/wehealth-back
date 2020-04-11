const express = require("express");
const messageRoutes = express.Router();
const _ = require("lodash");

let Message = require("../models/Message");

messageRoutes.route("/add").post(function (req, res) {
  let message = new Message(req.body);
  console.log("Adding message", message);
  message
    .save()
    .then((message) => {
      console.log("Added message", message);
      res.status(200).json(message);
    })
    .catch((err) => {
      console.log("Error ", err);
      res.status(400).send("unable to save to database");
    });
});

messageRoutes.route("/listByOrgId/:orgId").get(function (req, res) {
  const orgId = req.params.orgId;
  console.log("Get list message: ", orgId);
  Message.find({ orgId: orgId }, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.json(messages);
    }
  });
});

module.exports = messageRoutes;
