const Brands = require("../models/brands");

const showBrands = (req, res) => {
    Brands.find()
    .then((docs) => {
        if(!docs) {
            throw new Error("Дизайнеры не найдены");
        }
        return res.status(200).send(JSON.stringify(docs));
    })
};

const showBrand = (req, res) => {
    const { id } = req.params;
    // console.log(id);
    Brands.findById(id)
    .then((doc) => {
        if(!doc) {
            throw new Error("Дизайнер не найден");
        }
        return res.status(200).send(JSON.stringify(doc));
    })
};

module.exports = {
    showBrands,
    showBrand,
}