const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.render("index", {
    title: "home Page",
    content: "home",
  });
});

module.exports = route;
