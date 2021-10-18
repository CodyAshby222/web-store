const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
    required: "Enter a quantity",
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
