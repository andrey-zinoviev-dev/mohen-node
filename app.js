const express = require("express");

const app = express();

const cors = require("cors");

const { router } = require("./routers/router");
const { userRouter } = require("./routers/userRouter");
const { brandRouter } = require("./routers/brandRouter");
const { goodsRouter } = require("./routers/goodsRouter");
const { transactionsRouter } = require("./routers/transactionsRouter");

const cookieParser = require("cookie-parser");

//mongoose
const mongoose = require("mongoose");
const { auth } = require("./middlewares/authMiddlewares");
mongoose.connect("mongodb://127.0.0.1:27017/mohen")
.then((data) => {
  // console.log(data);
})
.catch((err) => {
  console.log(err);
})

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: "*",
  // origin: ["http://localhost:5173", "http://mohen-tohen.ru",],
  credentials: true,
}));

app.use(express.json());

app.use(cookieParser());

app.use("/applications", router);
app.use("/users", userRouter);
app.use("/brands", brandRouter);
app.use("/goods", goodsRouter);

//secured
app.use(auth);
app.use("/transactions", transactionsRouter);

app.listen(3000, () => {
  console.log("yes");
});