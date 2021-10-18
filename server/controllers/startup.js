const mongoose = require("mongoose");
const Item = mongoose.model("Item");
const itemList = require("../items.json");

exports.initalizeItems = () => {
  Item.find({}, (err, result) => {
    if (err) return;
    if (!result.length) {
      itemList.forEach((itemData) => {
        console.log(itemData + "item data");
        let item = new Item(itemData);
        item.save((err, result) => {
          if (err) return;
          console.log(result);
        });
      });
    }
  });
};
