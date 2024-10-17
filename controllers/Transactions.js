const Transactions = require("../models/transactions");
const Users = require("../models/user");

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
    const { _id } = req.user.payload;
    // console.log(req.body);
    const updatedGoods = req.body.goods.map((good) => {
        return {...good, good: good.good._id};
    });
    const brands = req.body.goods.map((good) => {
        return good.good.seller;
    });

    // console.log(updatedGoods);
    Transactions.create({parties: [...brands, _id], goods: updatedGoods, price: 39000})
    .then((createdTransaction) => {
        return Promise.all(createdTransaction.parties.map((party) => {
            return Users.findById(party)
            .then((doc) => {
                doc.ordersHistory.push(createdTransaction._id)
                doc.save();
                return doc;
            })
        }))
        .then((data) => {
            // console.log(createdTransaction);
            return res.status(201).send(JSON.stringify({createdOrder: createdTransaction}));
            // console.log(data);
        })
        // Users.findById(_id)
        // .then((user) => {
        //     user.ordersHistory.push(createdTransaction._id);
        //     user.save();
        // })
    })
};

module.exports = {
    showTransactions,
    createTransaction,
}