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
})

const transactionSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users",
    },
    goods: [
        goodSchema
    ],
    total: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model("Transactions", transactionSchema);