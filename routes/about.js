const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.render("about", {
    title: "home Page",
    content: "home",
  });
});

module.exports = route;
