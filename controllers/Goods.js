const Goods = require("../models/goods");

const showGoods = (req, res) => {
    Goods.find({})
    .then((docs) => {
        if(!docs) {
            throw new Error("Товары не найдены");
        }
        return res.status(200).send(JSON.stringify(docs));
    })
};

const showGood = (req, res) => {
    const { id } = req.params;
    Goods.findById(id)
    .then((doc) => {
        if(!doc) {
            throw new Error("Товар не найден");
        }
        return res.status(200).send(JSON.stringify(doc));
    })
}

module.exports = {
    showGoods,
    showGood,
}