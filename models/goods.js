const mongoose = require("mongoose");

const goodOptionSchema = new mongoose.Schema({
  title: String, 
  price: Number, 
  type: String,
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
  dimensions: String,
  material: String,
  color: String,
  category: String,
  madeToOrder: Boolean,
  // quantity: Number,
  // stock: Number,
  // madeToOrder: Boolean,
  photos: [String],
  goodOptions: [
    goodOptionSchema
  ]
  // dimensions: {}
}, {
  timestamps: true,
});

module.exports = mongoose.model("Goods", goodSchema);