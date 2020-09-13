const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getPosts } = require("../controllers/post");

router.get("/", protect, getPosts, (req, res) => {
  res.render("../views/pages/home", {
    user: req.user,
    posts: req.posts,
  });
});

module.exports = router;
