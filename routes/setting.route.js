const express = require("express");
const settingRoutes = express.Router();
const _ = require("lodash");

let Setting = require("../models/Setting");

settingRoutes.route("/updateSetting/:userId").post(function (req, res) {
  const userId = req.params.userId;
  let settingParam = new Setting({
    userId: userId,
    alertDistance: req.body.alertDistance,
  });
  console.log("updateSetting settingParam", settingParam);
  Setting.findOne({ userId: userId }).then((setting) => {
    console.log("updateSetting found ", setting);
    if (setting) {
      setting.alertDistance = settingParam.alertDistance;
      settingParam.eventDate = _.isEmpty(settingParam.eventDate)
        ? new Date()
        : settingParam.eventDate;
      console.log("updateSetting save setting ", setting);
      //update
      setting
        .save()
        .then((resData) => {
          res.status(200).json(resData);
        })
        .catch((err) => {
          res.status(400).send("unable to save to database");
        });
    } else {
      //add new
      settingParam.eventDate = new Date();
      console.log("updateSetting add new settingParam ", settingParam);

      settingParam
        .save()
        .then((setting) => {
          res.status(200).json({ setting });
        })
        .catch((err) => {
          res.status(400).send("unable to save to database");
        });
    }
  });
});

settingRoutes.route("/:userId").get(function (req, res) {
  const userId = req.params.userId;
  console.log("load setting ", userId);
  Setting.findOne({ userId: userId }).then((setting) => {
    console.log("loaded setting ", setting);
    if (setting) {
      res.json(setting);
    } else {
      res.json({});
    }
  });
});

module.exports = settingRoutes;
