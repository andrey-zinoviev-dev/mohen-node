const express = require("express");

const goodsRouter = express();

const { showGoods, showGood } = require("../controllers/Goods");

goodsRouter.get("/showGoods", showGoods);
goodsRouter.get("/showGood/:id", showGood);


module.exports = {
    goodsRouter,
}