const mongoose = require("mongoose");

// const favouritesSchema = new mongoose.Schema({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Goods",
// })

//cart item schema
const itemSchema = new mongoose.Schema({
  good: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goods",
  },
  quantity: Number,
  _id: false,
});

// const orderItemSchema = new mongoose.Schema({
//   goods: [
//     itemSchema
//   ],
//   buyer: {
//     type: mongoose.Schema.Types.ObjectId, ref: "Users",
// },
// })

const userSchema = new mongoose.Schema({
  name: String,
  brandName: String,
  email: String,
  phone: String,
  seller: Boolean,
  description: String,
  cover: String,
  ordersHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transactions",
    }
  ],
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    },
  ],
  basket: [itemSchema
    // {
    //   goodId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Goods",
    //   },
    //   quantity: Number,
    // }
  ],
  // ordersHistory: [
  //   {
  //     brand: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Users",
  //     },
  //     goods: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Goods",
  //       }
  //     ],
  //     price: Number,
  //   }
  // ],
  // sellsHistory: [
  //   {
  //     customer: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //     },
  //     goods: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "Goods",
  //       }
  //     ],
  //   }
  // ],
  goods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goods",
    }
  ],
});

module.exports = mongoose.model("Users", userSchema);