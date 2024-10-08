const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema({
  title: String,
  description: String,
  cover: String,
  price: Number,
  seller: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users",
  },
  batch: Number,
  dimensions: String,
  material: String,
  // quantity: Number,
  // stock: Number,
  // madeToOrder: Boolean,
  photos: [{
    title: String,
    url: String,
    _id: false,
  }],
  // dimensions: {}
});

module.exports = mongoose.model("Goods", goodSchema);