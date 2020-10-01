const Post = require("../modal/Post");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.getPosts = asyncHandler(async (req, res, next) => {
  let reqQuery = req.query;

  //find in db
  posts = await Post.find(reqQuery).sort({ created: -1 });

  console.log(posts);
  req.posts = posts;
  next();
});

exports.searchPosts = asyncHandler(async (req, res, next) => {
  let reqQuery = req.query;

  let queryStr = JSON.stringify(reqQuery);

  //find in db
  posts = await Post.find(JSON.parse(queryStr)).sort({ created: -1 });

  res.status(200).json(posts);
});

exports.getPost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id).populate("user");

  if (!post) {
    return next(
      new ErrorResponse(`Recipe not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.author = req.user.username;
  req.body.created = Date.now();
  let post = await Post.create(req.body);
  res.redirect("/");
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  let recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id ${req.params.id}`, 404)
    );
  }

  //check recipe ownership
  if (recipe.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorize to complete action`,
        404
      )
    );
  }

  recipe.remove();

  res.status(200).json({
    success: true,
    msg: "Deleted recipie",
    data: {},
  });
});
