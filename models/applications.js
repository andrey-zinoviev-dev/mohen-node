const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: String,
  type: String,
  path: String,
});

// const 

const applicationSchema = new mongoose.Schema({
  name: {value: String, textarea: Boolean, label: String},
  email: {value: String, textarea: Boolean, label: String},
  phone: {value: String, textarea: Boolean, label: String},
  city: {value: String, textarea: Boolean, label: String},
  category: {value: [String], textarea: Boolean, label: String},
  description: {value: String, textarea: Boolean, label: String},
  productionLength: {value: String, textarea: Boolean, label: String},
  productionProcess: {value: String, textarea: Boolean, label: String},
  stock: {value: String, textarea: Boolean, label: String},
  size: {value: String, textarea: Boolean, label: String},
  dateOfFill: {value: String, textarea: Boolean, date: Boolean},
  photos: {
    value: [photoSchema],
    photo: Boolean,
  },
  approved: {
    value: {
      approved: Boolean,
      declined: Boolean,
      // default: {
      //   approved: false,
      //   declined: false,
      // }
    }, 
    approved: Boolean,
    // default: {
    //   value: {
    //     approved: false,
    //     declined: false,
    //   },
    //   approved: false,
    // },
  },
});

module.exports = mongoose.model("Applications", applicationSchema);