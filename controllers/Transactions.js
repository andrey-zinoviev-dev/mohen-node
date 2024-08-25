const Transactions = require("../models/transactions");

const showTransactions = (req, res) => {
    const { id } = req.params;
    // console.log(id);
    Transactions.find({parties: {$in: [id]}})
    .then((docs) => {
        if(!docs) {
            throw new Error("История пуста");
        }
        return res.status(200).send(JSON.stringify(docs));
    })
    .catch((err) => {
        console.log(err);
    })
    // Transactions.findOne({parties: [id, "66c3db0eddfc365363ac0491"]})
    // .then((docs) => {
    //     console.log(docs);
    // })
    // Transactions.find()
};

module.exports = {
    showTransactions,
}