const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: "String",
    required: [false, "Please enter password"],
    minlength: 8,
    select: false,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
