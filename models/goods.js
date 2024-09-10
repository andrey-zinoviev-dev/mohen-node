const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema({
  title: String,
  description: String,
  cover: String,
  price: Number,
  seller: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users",
  },
  dimensions: String,
  material: String,
  // quantity: Number,
  // stock: Number,
  // madeToOrder: Boolean,
  photos: {
    title: String,
    url: String,
  }
  // dimensions: {}
});

module.exports = mongoose.model("Goods", goodSchema);