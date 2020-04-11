const express = require("express");
const orgRoutes = express.Router();
const _ = require("lodash");

let Org = require("../models/Org");
let Profile = require("../models/Profile");

orgRoutes.route("/add").post(function (req, res) {
  let org = new Org(req.body);
  const creatorId = org.creatorId;
  if (!_.isEmpty(creatorId)) {
    org.eventDate = _.isEmpty(org.eventDate) ? new Date() : org.eventDate;
    org.members.push(creatorId);
    console.log("Adding org ", req.body);
    org
      .save()
      .then((org) => {
        res.status(200).json(org);
      })
      .catch((err) => {
        console.log("Add org err", err);
        res.status(400).send("unable to save to database");
      });
  } else {
    console.log("Error adding org: no creator");
    res.status(200).json({});
  }
});

orgRoutes.route("/addMember/:orgId/:memberId").post(function (req, res) {
  const orgId = req.params.orgId;
  const memberId = req.params.memberId;
  console.log("Adding member to org", memberId, orgId);
  Org.findById(orgId, function (err, org) {
    if (err) {
      console.log(err);
      res.status(404).send("Unable to addMember");
    } else {
      if (!org) res.json({});
      else {
        if (!org.members.includes(memberId)) {
          org.members.push(memberId);
          org
            .save()
            .then((org) => {
              console.log("addMember done", org);
              res.json(org);
            })
            .catch((err) => {
              console.log("addMember err", err);
              res.status(400).send("Unable to addMember");
            });
        }
      }
    }
  });
});

orgRoutes.route("/listByCreator/:creatorId").get(function (req, res) {
  const creatorId = req.params.creatorId;
  let filter = {};
  if (creatorId) {
    filter = { creatorId };
  }
  console.log("Get list org filter: ", filter);
  Org.find(filter, (err, orgs) => {
    if (err) {
      console.log(err);
    } else {
      res.json(orgs);
    }
  });
});

orgRoutes.route("/:orgId").get(function (req, res) {
  const orgId = req.params.orgId;
  if (orgId) {
    console.log("Find org : ", orgId);
    Org.findById(orgId, (err, org) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Found org : ", org);
        res.json(org);
      }
    });
  } else {
    res.json({});
  }
});

orgRoutes.route("/listByMember/:memberId").get(function (req, res) {
  const memberId = req.params.memberId;
  let filter = {};
  if (memberId) {
    filter = { members: memberId };
  }
  console.log("Get list org filter: ", filter);
  Org.find(filter, (err, orgs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Found list org : ", orgs);
      res.json(orgs);
    }
  });
});

orgRoutes.route("/listExceptMember/:memberId").get(function (req, res) {
  const memberId = req.params.memberId;
  let filter = {};
  if (memberId) {
    filter = { members: { $ne: memberId } };
  }
  console.log("Get list org filter: ", filter);
  Org.find(filter, (err, orgs) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Found ", orgs);
      res.json(orgs);
    }
  });
});

orgRoutes.route("/members/:orgId/:memberId").get(function (req, res) {
  const orgId = req.params.orgId;
  const memberId = req.params.memberId;
  const filter = {
    _id: orgId,
    members: memberId,
  };
  console.log("Get list members filter: ", filter);
  Org.findOne(filter, async (err, org) => {
    if (err) {
      console.log(err);
      res.json({});
    } else {
      console.log("Found org", org);
      try {
        const profilesPromises = _.map(org.members, (memberId) => {
          return Profile.findOne({ userId: memberId }, (err, profile) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Found profile", profile);
              return profile;
            }
          });
        });
        Promise.all(profilesPromises)
          .then((profiles) => {
            console.log("Found profiles", profiles);
            res.json(profiles);
          })
          .catch((err) => {
            console.log("Error getting members promises ", err);
            res.json({});
          });
      } catch (err) {
        console.log("Error getting members ", err);
      }
    }
  });
});

orgRoutes
  .route("/deleteByCreatorId/:orgId/:creatorId")
  .post(function (req, res) {
    const orgId = req.params.orgId;
    const creatorId = req.params.creatorId;
    console.log("Delete ", orgId, creatorId);
    Org.findOneAndRemove({ _id: orgId, creatorId: creatorId }, (err, org) => {
      if (err) res.json(err);
      else {
        console.log("Deleted org");
        res.json(org);
      }
    });
  });

module.exports = orgRoutes;
