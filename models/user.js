const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  seller: Boolean,
  favourites: Array,
  ordersHistory: Array,
});

module.exports = mongoose.model("Users", userSchema);