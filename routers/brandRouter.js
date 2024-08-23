const express = require("express");
const { showBrands, showBrand } = require("../controllers/Brands");

const brandRouter = express();

brandRouter.get("/showBrands", showBrands);
brandRouter.get("/showBrand/:id", showBrand);

module.exports = {
    brandRouter,
}