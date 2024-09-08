const express = require("express");

const goodsRouter = express();

const { showGoods, showGood, addGood } = require("../controllers/Goods");

goodsRouter.get("/showGoods", showGoods);
goodsRouter.get("/showGood/:id", showGood);
goodsRouter.post("/add", addGood)

module.exports = {
    goodsRouter,
}