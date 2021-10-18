const mongoose = require("mongoose");
const uuid = require("uuid");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Enter the name of the user",
  },
  email: {
    type: String,
    required: "Enter an email",
  },
  password: {
    type: String,
    required: "Enter a password",
  },
  key: {
    type: String,
    default: uuid.v4(),
  },
});

module.exports = mongoose.model("User", userSchema);
