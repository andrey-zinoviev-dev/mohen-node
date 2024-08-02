const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  category: [String],
  description: String,
  productionLength: String,
  productionProcess: String,
  stock: String,
  size: String,
});

module.exports = mongoose.model("Applications", applicationSchema);