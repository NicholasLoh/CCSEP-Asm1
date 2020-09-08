const Post = require("../modal/Post");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.getPosts = asyncHandler(async (req, res, next) => {
  let posts = await Post.find();
  res.status(200).json(posts);
});

exports.getPost = asyncHandler(async (req, res, next) => {
  let recipes = await Recipe.findById(req.params.id).populate("user");

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
  req.body.user = req.user._id;
  let recipe = await Recipe.create(req.body);
  res.status(200).json({
    success: true,
    msg: "Add new recipe",
    data: recipe,
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
