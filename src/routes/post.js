const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  searchPosts,
} = require("../controllers/post");
const { protect } = require("../middleware/auth");

router.route("/").get(getPosts).post(protect, createPost);

router.get("/create", (req, res) => {
  res.render("../views/pages/addPost");
});

router.route("/search").get(protect, searchPosts);
router.route("/:id").get(getPost).delete(deletePost);

module.exports = router;
