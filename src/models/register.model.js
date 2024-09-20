const mongoose = require("mongoose");
const shortid = require('shortid');
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `BLOG-USER-REG-${shortid.generate()}`,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = { UserModel };
