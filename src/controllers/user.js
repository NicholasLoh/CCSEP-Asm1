const User = require("../modal/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.register = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  //Create a new user
  let user = await User.create({
    username,
    password,
  });
  console.log("registred");
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  //check for user if exist
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password correct
  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenCookie(user, 200, res);

  res.redirect("/");
});
