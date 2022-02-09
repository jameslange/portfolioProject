const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const emailSender = require("./models/emailSender");
const Home = require("./routes/home");
const About = require("./routes/about");
const Gallery = require("./routes/gallery");
const Contact = require("./routes/contact");

app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/content"));
app.use(express.static(path.join(__dirname, "/public")));
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
app.post("/contact", (req, res) => {
  emailSender
    .sendEmail(req.body)
    .then((info) => {
      console.log(info);
      res.json({ result: "done" });
    })
    .catch((error) => {
      console.log(error);
      res.json({ result: "error" });
    });
});

app.listen(app.get("port"), () => {
  console.log(`The server is running on port ${app.get("port")}`);
});
