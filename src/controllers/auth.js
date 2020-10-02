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
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("x-access-token", token, options);
  res.redirect("/");
});

exports.login = asyncHandler(async (req, res, next) => {
  let reqQuery = req.query;

  //Validate email and password
  if (!reqQuery.username || !reqQuery.password) {
    return res.status(400).send("Invalid credentials");
  }

  reqQuery.username = reqQuery.username.toString();
  reqQuery.password = reqQuery.password.toString();

  //check for user if exist
  const user = await User.findOne(reqQuery);

  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("x-access-token", token, options);
  res.redirect("/");
});
