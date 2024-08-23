const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: String,
    description: String,
    cover: String,
    goodsCollection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Goods",
        }
    ],
    // goodsCollection?: GoodInterface[] | undefined,
    // _id: string,
});

module.exports = mongoose.model("Brands", brandSchema);