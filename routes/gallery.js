const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.render("gallery", {
    title: "home Page",
    content: "home",
  });
});

module.exports = route;
