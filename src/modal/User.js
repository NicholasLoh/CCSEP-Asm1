const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
});

UserSchema.methods.getSignedJwtToken = function () {
  const token = jwt.sign(
    { id: this._id },
    "730853930c2aefed0de0ec21cfd93495ca1506b4a41d5b32a9b179182fb04a7a",
    {
      expiresIn: "1h",
    }
  );

  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
