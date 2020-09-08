const express = require("express");
const path = require("path");
const connectDB = require("./db");
const PORT = 3000;

const app = express();

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
