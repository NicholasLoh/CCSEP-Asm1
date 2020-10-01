const jwt = require("jsonwebtoken");
const AsyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const User = require("../modal/User");

exports.protect = AsyncHandler(async (req, res, next) => {
  let token = req.cookies["x-access-token"];

  //if token not exist
  if (!token) {
    res.redirect("/auth/login");
  }

  //verify token
  try {
    const decoded = jwt.verify(
      token,
      "730853930c2aefed0de0ec21cfd93495ca1506b4a41d5b32a9b179182fb04a7a"
    );
    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.redirect("/auth/login");
    } else {
      return next(new ErrorResponse("Not authorized", 401));
    }
  }
});
