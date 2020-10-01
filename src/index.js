const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("./db");
const PORT = 3000;

const app = express();

//use forms
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//load env
dotenv.config({ path: "./config.env" });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use("/styles", express.static(__dirname + "/styles"));

//route files
const index = require("./routes/index");
const auth = require("./routes/auth");
const post = require("./routes/post");

connectDB();

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});

//mount routers
app.use("/", index);
app.use("/auth", auth);
app.use("/post", post);
