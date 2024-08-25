const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    parties: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Users",
        }
    ],
    goods: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Goods",

        }
    ],
    price: Number
});

module.exports = mongoose.model("Transactions", transactionSchema);