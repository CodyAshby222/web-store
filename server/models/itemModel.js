const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemID: {
    type: Number,
    required: "Enter an item id",
  },
  name: {
    type: String,
    required: "Enter an item name",
  },
  price: {
    type: Number,
    required: "Enter an item price",
  },
  weight: {
    type: Number,
    required: "Enter an item weight in oz",
  },
  rating: {
    type: Number,
    required: "Enter an item rating up to 5",
  },
  protection: {
    type: Number,
    required: "Enter an item protection percentage",
  },
  imgSrc: {
    type: String,
    required: "Enter an item image source",
  },
});

module.exports = mongoose.model("Item", itemSchema);
