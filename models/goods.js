const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema({
  title: String,
  cover: String,
  price: Number,
  seller: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users",
  },
  material: String,
  quantity: Number,
  stock: Number,
  madeToOrder: Boolean,
  // dimensions: {}
});

module.exports = mongoose.model("Goods", goodSchema);