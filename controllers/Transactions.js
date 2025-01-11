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

const getTransaction = (req, res) => {
    const { id } = req.params;
    Transactions.findById(id).populate({path: "goods", populate: {
        path: "good",
    }})
    .then((doc) => {
        if(!doc) {
            throw Error("Транзакция не найдена");
        }
        return res.status(200).send(JSON.stringify(doc));
    })
};

const createTransaction = (req, res) => {
    const { _id } = req.user.payload;

    const sellers = req.body.goods.map((good) => {
        return good.seller;
    });

    Transactions.create({goods: req.body.goods, buyer: _id, total: req.body.total})
    .then((transactionCreated) => {
        if(!transactionCreated) {
            throw new Error("Произошла какая-то ошибка, попробуйте еще раз")
        }

        return Promise.all([_id, ...sellers].map((user) => {
            return Users.findById(user)
            .then((doc) => {
                // console.log(doc);
                doc.ordersHistory.push(transactionCreated._id);
                doc.save();
                return doc;
            })
        }))
        .then(() => {
            // console.log(updatedUsers);
            return res.status(201).send(JSON.stringify({createdOrder: transactionCreated}));
        })
    })

    
};

module.exports = {
    showTransactions,
    getTransaction,
    createTransaction,
}