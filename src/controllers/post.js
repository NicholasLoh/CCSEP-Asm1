const Post = require("../modal/Post");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.getPosts = asyncHandler(async (req, res, next) => {
  let reqQuery = req.query;

  if (reqQuery.type == "author") {
    posts = await Post.find({ author: reqQuery.input }).sort({ created: -1 });
  } else if (reqQuery.type == "title") {
    posts = await Post.find({ title: { $regex: reqQuery.input } }).sort({
      created: -1,
    });
  } else if (reqQuery.type == "description") {
    posts = await Post.find({ description: { $regex: reqQuery.input } }).sort({
      created: -1,
    });
  } else {
    posts = await Post.find().sort({
      created: -1,
    });
  }

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
      new ErrorResponse(`Post not found with id ${req.params.id}`, 404)
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
