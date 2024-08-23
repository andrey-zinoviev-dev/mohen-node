const mongoose = require("mongoose");

// const favouritesSchema = new mongoose.Schema({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Goods",
// })

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  seller: Boolean,
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    }
  ],
  basket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    }
  ],
  ordersHistory: Array,
  goods: Array,
});

module.exports = mongoose.model("Users", userSchema);