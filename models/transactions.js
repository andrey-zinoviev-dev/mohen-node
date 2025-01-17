const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema({
    _id: String,
    title: String,
    cover: String,
    seller: String,
    price: Number,
    selectedColor: {
        option: String,
        price: Number,
    },
    selectedDimension: {
        option: String,
        price: Number,
    },
    selectedMaterial: {
        option: String,
        price: Number,
    },
    quantity: Number,
    // _id: false,
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