const Transactions = require("../models/transactions");

const showTransactions = (req, res) => {
    const { _id } = req.user.payload;
    // console.log(id);
    Transactions.find({parties: {$in: [_id]}})
    .then((docs) => {
        if(!docs) {
            throw new Error("История пуста");
        }
        return res.status(200).send(JSON.stringify(docs));
    })
    .catch((err) => {
        console.log(err);
    })

};

const createTransaction = (req, res) => {
    console.log(req.body);
};

module.exports = {
    showTransactions,
    createTransaction,
}