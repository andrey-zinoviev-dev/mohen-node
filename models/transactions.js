const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema({
    good: {
        type: mongoose.Schema.Types.ObjectId, ref: "Goods",
    },
    quantity: Number,
    _id: false,
})

const transactionSchema = new mongoose.Schema({
    // buyer: {
    //     _id: String,
    //     name: String,
    //     cover: String,
    // },
    // goods: [
    //     {
    //         _id: String,
    //         title: String,
    //         cover: String,
    //         quantity: Number,
    //         price: Number,
    //         seller: {
    //             _id: String,
    //             name: String,
    //             cover: String,
    //         }
    //     }
    // ],
    // sellers: [
    //     {
    //         _id: String,
    //         name: String,
    //         cover: String,
    //     },
    // ],
    // parties: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId, ref: "Users",
    //     }
    // ],
    // goods: [
    //     {
    //         good: {
    //             type: mongoose.Schema.Types.ObjectId, ref: "Goods",
    //         },
    //         quantity: Number,
    //         _id: false,
    //     }
    // ],
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