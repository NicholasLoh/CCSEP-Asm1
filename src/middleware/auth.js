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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
