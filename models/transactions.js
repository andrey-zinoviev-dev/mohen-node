const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema({
    _id: String,
    title: String,
    seller: String,
    price: Number,
    color: {
        option: String,
        price: Number,
    },
    dimension: {
        option: String,
        price: Number,
    },
    material: {
        option: String,
        price: Number,
    },
    quantity: Number,
    _id: false,
});

const personalDataSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    zipcode: String,
})

const transactionSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users",
    },
    personalData: personalDataSchema,
    goods: [
        goodSchema
    ],
    total: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model("Transactions", transactionSchema);