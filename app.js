if (process.env.NODE_ENV !== "production") require("dotenv").config();
const helmet = require("helmet");
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
const getChats = require("./routes/getchats");
const findposts = require("./routes/findPosts");
const cookieauth = require("./routes/cookieauth");
const editProfile = require("./routes/editProfile");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

app.use(cors());
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(upload.single("audio"));
app.use(express.static("public"));

const ensureAuthenticated = (req, res, next) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_CRED, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        return next();
      } else {
        res.json("unauthorized token");
      }
    });
  } else console.log("no token present");
};

app.use("/", indexRouter);
app.use("/register", register);
app.use("/login", login);
app.use("/dashboard", ensureAuthenticated, dashboard);
app.use("/audiopost", ensureAuthenticated, audioPost);
app.use("/chatpost", ensureAuthenticated, chatPost);
app.use("/findposts", ensureAuthenticated, findposts);
app.use("/getchats", ensureAuthenticated, getChats);
app.use("/cookieauth", cookieauth);
app.use("/editprofile", ensureAuthenticated, editProfile);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected");
});

mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`,
  {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

module.exports = app;
