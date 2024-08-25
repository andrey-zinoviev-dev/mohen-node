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
  description: String,
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    },
  ],
  basket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    }
  ],
  ordersHistory: [
    {
      brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      goods: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Goods",
        }
      ],
      price: Number,
    }
  ],
  sellsHistory: [
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      goods: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Goods",
        }
      ],
    }
  ],
  goods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    }
  ],
});

module.exports = mongoose.model("Users", userSchema);