const express = require("express");

const app = express();

const cors = require("cors");

const { router } = require("./routers/router");
const { userRouter } = require("./routers/userRouter");
const { brandRouter } = require("./routers/brandRouter");
const { goodsRouter } = require("./routers/goodsRouter");
const { transactionsRouter } = require("./routers/transactionsRouter");

//mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mohen")
.then((data) => {
  // console.log(data);
})
.catch((err) => {
  console.log(err);
})

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"]
}))

app.use("/applications", router);
app.use("/users", userRouter);
app.use("/brands", brandRouter);
app.use("/goods", goodsRouter);
app.use("/transactions", transactionsRouter);

app.listen(3001, () => {
  console.log("yes");
});