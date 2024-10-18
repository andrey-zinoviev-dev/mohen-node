const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    buyer: {
        _id: String,
        name: String,
        cover: String,
    },
    goods: [
        {
            _id: String,
            title: String,
            cover: String,
            quantity: Number,
            price: Number,
            seller: {
                _id: String,
                name: String,
                cover: String,
            }
        }
    ],
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
    total: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model("Transactions", transactionSchema);