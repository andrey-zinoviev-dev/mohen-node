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
    // console.log(req.body.goods);
    const updatedGoods = req.body.goods.map((good) => {
        return {_id: good.good._id, title: good.good.title, cover: good.good.photos[0].url, price: good.good.price, quantity: good.quantity, seller: {
            _id: good.good.seller._id,
            name: good.good.seller.name,
            cover: good.good.seller.cover,
        }};
    });
    const sellers = updatedGoods.map((good) => {
        return good.seller._id;
    })
    // console.log(updatedGoods);
    // const brands = req.body.goods.map((good) => {
    //     return good.good.seller;
    // });

    // console.log(updatedGoods);
    Transactions.create({ buyer: {_id: _id}, goods: updatedGoods, total: 36000})
    .then((createdTransaction) => {
        console.log(createdTransaction);
        return Promise.all([_id, sellers].map((party) => {
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