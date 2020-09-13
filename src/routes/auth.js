const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.get("/login", (req, res) => {
  res.render("../views/pages/login");
});

router.get("/register", (req, res) => {
  res.render("../views/pages/register");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
