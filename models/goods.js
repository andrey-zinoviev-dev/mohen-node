const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: String, 
  price: Number, 
  _id: false,
})

const goodSchema = new mongoose.Schema({
  title: String,
  description: String,
  cover: String,
  price: Number,
  seller: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users",
  },
  batch: Number,
  dimensions: [
    optionSchema
  ],
  materials: [optionSchema],
  colors: [optionSchema],
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