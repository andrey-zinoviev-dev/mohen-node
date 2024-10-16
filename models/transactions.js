const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    parties: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Users",
        }
    ],
    goods: [
        {
            good: {
                type: mongoose.Schema.Types.ObjectId, ref: "Goods",
            },
            quantity: Number,
            _id: false,
        }
    ],
    price: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model("Transactions", transactionSchema);