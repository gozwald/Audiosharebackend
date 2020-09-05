require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const login = require("./routes/login");
const register = require("./routes/register");
const dashboard = require("./routes/dashboard");
const audioPost = require("./routes/audioPost");
const chatPost = require("./routes/chatPost");
const jwt = require("jsonwebtoken");

const app = express();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

const ensureAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "bleeeblaaablooo", () => {
      return next();
    });
  } else console.log("error");
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/register", register);
app.use("/login", login);
app.use("/dashboard", ensureAuthenticated, dashboard);
app.use("/audiopost", audioPost);
app.use("/chatpost", chatPost);

mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = app;
