const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
    maxlength: [50, "Name cannot be longer than 50 words"],
  },
  author: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
    required: true,
    maxlength: [250, "Description cannot be longer than 50 words"],
  },
});
const User = mongoose.model("Post", postSchema);
module.exports = User;
