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
  color: String,
  category: String,
  madeToOrder: Boolean,
  // quantity: Number,
  // stock: Number,
  // madeToOrder: Boolean,
  photos: [String],
  // dimensions: {}
}, {
  timestamps: true,
});

module.exports = mongoose.model("Goods", goodSchema);