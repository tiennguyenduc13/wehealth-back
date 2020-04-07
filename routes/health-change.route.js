const express = require("express");
const healthChangeRoutes = express.Router();

// Require HealthChange model in our routes module
let HealthChange = require("../models/HealthChange");

// Defined store route
healthChangeRoutes.route("/add").post(function (req, res) {
  let healthChange = new HealthChange(req.body);
  console.log("Adding healthChange");
  healthChange
    .save()
    .then((healthChange) => {
      res.status(200).json(healthChange);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

healthChangeRoutes.route("/listByUserId/:userId").get(function (req, res) {
  res.header("Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const userId = req.params.userId;
  console.log("Get list healthChange: ", userId);
  HealthChange.find({ userId: userId }, (err, healthChanges) => {
    if (err) {
      console.log(err);
    } else {
      res.json(healthChanges);
    }
  });
});

healthChangeRoutes.route("/latest/:userId").get(function (req, res) {
  const userId = req.params.userId;
  HealthChange.find({ userId: userId })
    .sort({ eventDate: -1 })
    .limit(1)
    .then((healthChanges) => {
      if (healthChanges && healthChanges.length) {
        res.json(healthChanges[0]);
      } else {
        res.json({});
      }
    });
});

//  Defined update route
healthChangeRoutes.route("/update/:id").post(function (req, res) {
  const id = req.params.id;
  HealthChange.findById(id, function (err, next, healthChange) {
    if (!healthChange) return next(new Error("Could not load Document"));
    else {
      healthChange.userId = req.body.userId;

      healthChange
        .save()
        .then((healthChange) => {
          res.json("Update complete");
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

healthChangeRoutes.route("/delete/:id").post(function (req, res) {
  const healthChangeId = req.params.id;
  console.log("Delete ", healthChangeId);

  HealthChange.findByIdAndRemove({ _id: healthChangeId }, function (
    err,
    healthChange
  ) {
    console.log("Delete found ", healthChange);
    if (err) res.json(err);
    else {
      console.log("Delete Ok");
      res.json(healthChangeId);
    }
  });
});

module.exports = healthChangeRoutes;
