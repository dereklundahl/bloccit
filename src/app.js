const express = require("express");
const app = express();

const routeConfig = require("./config/route-config.js");

app.use("/marco", (req, res, next) => {
  res.send("polo")
});

routeConfig.init(app);

module.exports = app;
