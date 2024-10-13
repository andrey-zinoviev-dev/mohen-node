const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  title: String,
  // type: String,
  url: String,
});

// const 

// const applicationSchema = new mongoose.Schema({
//   name: {value: String, textarea: Boolean, label: String},
//   email: {value: String, textarea: Boolean, label: String},
//   phone: {value: String, textarea: Boolean, label: String},
//   city: {value: String, textarea: Boolean, label: String},
//   category: {value: [String], textarea: Boolean, label: String},
//   description: {value: String, textarea: Boolean, label: String},
//   productionLength: {value: String, textarea: Boolean, label: String},
//   productionProcess: {value: String, textarea: Boolean, label: String},
//   stock: {value: String, textarea: Boolean, label: String},
//   size: {value: String, textarea: Boolean, label: String},
//   dateOfFill: {value: String, textarea: Boolean, date: Boolean},
//   photos: {
//     value: [photoSchema],
//     photo: Boolean,
//   },
//   approved: {
//     value: {
//       approved: Boolean,
//       declined: Boolean,
//       // default: {
//       //   approved: false,
//       //   declined: false,
//       // }
//     }, 
//     approved: Boolean,
//     // default: {
//     //   value: {
//     //     approved: false,
//     //     declined: false,
//     //   },
//     //   approved: false,
//     // },
//   },
// });

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  brandName: String,
  category: [String],
  description: String,
  productionLength: String,
  productionProcess: String,
  stock: String,
  size: String,
  dateOfFill: String,
  photos: [photoSchema],
  approved: String,
})

module.exports = mongoose.model("Applications", applicationSchema);