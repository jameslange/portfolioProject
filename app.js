const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const fetch = require("node-fetch");
const emailSender = require("./models/emailSender");
const Home = require("./routes/home");
const About = require("./routes/about");
const Gallery = require("./routes/gallery");
const Contact = require("./routes/contact");
const bodyParser = require("body-parser");

app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/content"));
app.use(express.static(path.join(__dirname, "/public")));
//app.use(bodyParser.json());
//app.use("/bootstrap", express.static(path.join(__dirname, "/node_modules/bootstrap")));
//app.use("/jquery", express.static(path.join(__dirname, "/node_modules/jquery")));

app.use("/", Home);
app.use("/about", About);
app.use("/gallery", Gallery);
app.use("/contact", Contact);

// app.post("/contact", (req, res) => {
//   emailSender.sendEmail(req.body, (data) => {
//     //console.log(data);
//     res.json(data);
//   });
// });
// app.post("/contact", async (req, res) => {
//   const key = process.env.CAPTCHA_SECRET_KEY;
//   const googleResponse = await fetch(
//     "https://www.google.com/recaptcha/api/siteverify?secret=" + key + "&response=" + req.body.recaptchaResponse,
//     {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//     }
//   );
//   console.log(googleResponse);
//   const googleResult = await googleResponse.json();
//   console.log(googleResult);
//   if (googleResult.success) {
//     emailSender
//       .sendEmail(req.body)
//       .then((info) => {
//         console.log(info);
//         res.json({ result: "done" });
//       })
//       .catch((error) => {
//         console.log(error);
//         res.json({ result: "error" });
//       });
//   } else {
//     res.json({ result: "error" });
//   }
// });

app.post("/contact", async (req, res) => {
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

app.listen(app.get("port"), () => {
  console.log(`The server is running on port ${app.get("port")}`);
});
