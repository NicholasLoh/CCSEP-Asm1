const Post = require("../modal/Post");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.getPosts = asyncHandler(async (req, res, next) => {
  let reqQuery = req.query;

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|ne)\b/g,
    (match) => `$${match}`
  );

  //find in db
  posts = await Post.find(JSON.parse(queryStr));

  req.posts = posts;
  next();
});

exports.searchPosts = asyncHandler(async (req, res, next) => {
  let reqQuery = req.query;

  console.log(">>>>>>>>>>>>>>>>>>>>>", reqQuery);

  let queryStr = JSON.stringify(reqQuery);

  /* queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|ne)\b/g,
    (match) => `$${match}`
  );
 */
  console.log(JSON.parse(queryStr));
  //find in db
  posts = await Post.find(JSON.parse(queryStr));

  console.log(posts);
  res.status(200).json(posts);
});

exports.getPost = asyncHandler(async (req, res, next) => {
  let recipes = await Post.findById(req.params.id).populate("user");

  if (!recipes) {
    return next(
      new ErrorResponse(`Recipe not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: "Get all recipie",
    data: recipes,
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.author = req.user.username;
  let post = await Post.create(req.body);
  res.status(200).json({
    success: true,
    msg: "Add new post",
    data: post,
  });
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
