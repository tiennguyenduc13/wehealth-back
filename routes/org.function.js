exports.addMemberToOrg = (req, res, memberId, orgId) => {
  let Org = require("../models/Org");
  console.log("start addMemberToOrg: ", memberId, orgId);
  Org.findById(orgId, function (err, org) {
    if (err) {
      console.log("Error ", err);
      res.status(404).send("Unable to addMember");
    } else {
      if (!org) res.json({});
      else {
        console.log("addMemberToOrg found org: ", org);
        if (!org.members.includes(memberId)) {
          org.members.push(memberId);
          org
            .save()
            .then((org) => {
              console.log("addMemberToOrg done", org);
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
};
