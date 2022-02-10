const express = require("express");
const route = express.Router();
const fetch = require("node-fetch");
const emailSender = require("../models/emailSender");
require("dotenv").config();

route.get("/", (req, res) => {
  res.render("contact", {
    title: "home Page",
    content: "home",
  });
});

route.post("/", async (req, res) => {
  console.log(req.body);
  const key = process.env.CAPTCHA_SECRET_KEY;
  const googleResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify?secret=" + key + "&response=" + req.body.recaptchaResponse,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(googleResponse);
  const googleResult = await googleResponse.json();
  console.log(googleResult);
  if (googleResult.success) {
    emailSender.sendEmail(req.body, (data) => {
      res.json(data);
    });
  } else {
    res.json({ result: "error" });
  }
});

module.exports = route;
