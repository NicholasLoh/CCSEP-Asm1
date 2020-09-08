const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
} = require("../controllers/post");
//const { protect } = require("../middleware/auth");

router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPost).delete(deletePost);

module.exports = router;
