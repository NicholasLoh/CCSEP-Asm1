const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
//const { protect } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("../views/pages/index");
});
router.post("/register", register);
router.post("/login", login);
//router.get("/me", protect, getMe);

module.exports = router;
