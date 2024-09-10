const express = require("express");

const goodsRouter = express();

const { auth } = require("../middlewares/authMiddlewares");

const { showGoods, showGood, addGood } = require("../controllers/Goods");

goodsRouter.get("/showGoods", showGoods);
goodsRouter.get("/showGood/:id", showGood);
goodsRouter.post("/add", auth, addGood)

module.exports = {
    goodsRouter,
}