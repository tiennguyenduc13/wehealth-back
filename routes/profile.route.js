const express = require("express");
const profileRoutes = express.Router();
const _ = require("lodash");

let Profile = require("../models/Profile");

profileRoutes.route("/updateProfile/:userId").post(function (req, res) {
  const userId = req.params.userId;
  let profileParam = new Profile({
    userId: userId,
    email: req.body.email,
    name: req.body.name,
    cellPhone: req.body.cellPhone,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
  });
  console.log("updateProfile profileParam", profileParam);
  Profile.findOne({ userId: userId }).then((profile) => {
    console.log("updateProfile found ", profile);
    if (profile) {
      profile.email = profileParam.email;
      profile.name = profileParam.name;
      profile.eventDate = _.isEmpty(profile.eventDate())
        ? new Date()
        : profile.eventDate;
      profile.cellPhone = profileParam.cellPhone;
      profile.dateOfBirth = profileParam.dateOfBirth;
      profile.gender = profileParam.gender;
      console.log("updateProfile save profile ", profile);
      //update
      profile
        .save()
        .then((resData) => {
          res.status(200).json(resData);
        })
        .catch((err) => {
          res.status(400).send("unable to save to database");
        });
    } else {
      //add new
      profileParam.eventDate = new Date();
      console.log("updateProfile add new profileParam ", profileParam);

      profileParam
        .save()
        .then((profile) => {
          res.status(200).json({ profile });
        })
        .catch((err) => {
          res.status(400).send("unable to save to database");
        });
    }
  });
});

profileRoutes.route("/:userId").get(function (req, res) {
  const userId = req.params.userId;
  console.log("load profile ", userId);
  Profile.findOne({ userId: userId }).then((profile) => {
    console.log("loaded profile ", profile);
    if (profile) {
      res.json(profile);
    } else {
      res.json({});
    }
  });
});

module.exports = profileRoutes;
