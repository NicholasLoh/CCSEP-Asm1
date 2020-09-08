const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./db");
const PORT = 3000;

const app = express();

//load env
dotenv.config({ path: "./config.env" });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use("/styles", express.static(__dirname + "/styles"));

//route files
const user = require("./routes/user");
const post = require("./routes/post");

connectDB();

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});

//mount routers
app.use("/", user);
app.use("/post", post);
