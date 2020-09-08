const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
//const { protect } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("../views/pages/login");
});
router.get("/register", (req, res) => {
  res.render("../views/pages/register");
});
router.get("/home", (req, res) => {
  res.send("Welcome User");
});
router.post("/register", register);
router.post("/login", login);
//router.get("/me", protect, getMe);

module.exports = router;
