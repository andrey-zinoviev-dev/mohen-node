const express = require("express");

const goodsRouter = express();

const { auth } = require("../middlewares/authMiddlewares");

const { showGoods, showAccountGoods, showGood, addGood } = require("../controllers/Goods");

goodsRouter.get("/showGoods", showGoods);
goodsRouter.get("/showGoods/user", auth, showAccountGoods)
goodsRouter.get("/showGood/:id", showGood);
goodsRouter.post("/add", auth, addGood)

module.exports = {
    goodsRouter,
}