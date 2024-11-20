const express = require("express");

const goodsRouter = express();

const { auth } = require("../middlewares/authMiddlewares");

const { showGoods, showAccountGoods, showGood, addGood, updateBatch, showCategory } = require("../controllers/Goods");
goodsRouter.get("/test", (req, res) => {
    console.log("test");
    return res.status(200).send({message: "Тестовое сообщение"});
})
goodsRouter.get("/showGoods", showGoods);
goodsRouter.get("/showGoods/user", auth, showAccountGoods)
goodsRouter.get("/categories/:name", showCategory)
goodsRouter.get("/showGoods/:id", showGood);
goodsRouter.post("/add", auth, addGood);
goodsRouter.put("/updateBatch/:id", auth, updateBatch)

module.exports = {
    goodsRouter,
}