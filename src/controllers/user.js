const User = require("../modal/User");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  //Create a new user
  let user = await User.create({
    username,
    email,
    password,
  });

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("token", token, options);
  res.body("user", user);
  res.redirect("/home");
});

exports.login = asyncHandler(async (req, res, next) => {
  let query = {};

  //Validate email and password
  if (!req.body.username || !req.body.password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  query.username = req.body.username;
  query.password = req.body.password;

  console.log(query);
  //check for user if exist
  const user = await User.findOne(query);

  console.log(user);

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("token", token, options);
  res.redirect("/home");
});
