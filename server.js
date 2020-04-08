const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  config = require("./db");

const businessRoute = require("./routes/business.route");
const healthChangeRoute = require("./routes/health-change.route");
const positionMapRoute = require("./routes/position-map.route");
const profileRoute = require("./routes/profile.route");
const settingRoute = require("./routes/setting.route");
const orgRoute = require("./routes/org.route");

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(cors({}));
app.use("/business", businessRoute);
app.use("/health-change", healthChangeRoute);
app.use("/position-map", positionMapRoute);
app.use("/profile", profileRoute);
app.use("/setting", settingRoute);
app.use("/org", orgRoute);

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log("Listening on port " + port);
});
