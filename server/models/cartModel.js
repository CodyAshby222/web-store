const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userKey: {
    type: String,
    required: "Enter a user key",
  },
  itemID: {
    type: String,
    required: "Enter an itemID",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
