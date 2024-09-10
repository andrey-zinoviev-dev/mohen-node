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
};

const addGood = (req, res) => {
    // console.log(req.body);
    const { _id } = req.user.payload;
    const { good } = req.body;

    const photosArray = good.photos.map((photo) => {
        return {title: photo.title};
    });
    // console.log(photosArray);
    Goods.create({title: good.title, description: good.description, material: good.material, dimensions: good.dimensions, photos: photosArray, price: good.price, seller: _id})
    .then((createdDoc) => {
        if(!createdDoc) {
            throw new Error("Что-то пошло не так при создании товара")
        }
        return res.status(201).send(JSON.stringify(createdDoc));
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = {
    showGoods,
    showGood,
    addGood,
}