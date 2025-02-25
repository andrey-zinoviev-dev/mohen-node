

// MongoClient.connect(url, options, function(err, conn) {
//     if (conn.isConnected()) {
//         const db = conn.db(DB_NAME)
//         console.log(db.databaseName);
//     }
//     console.log('connect to db here');

//     conn.close()
// })
// console.log()

const express = require("express");

const app = express();

const cors = require("cors");

const { router } = require("./routers/router");
const { userRouter } = require("./routers/userRouter");
const { brandRouter } = require("./routers/brandRouter");
const { goodsRouter } = require("./routers/goodsRouter");
const { transactionsRouter } = require("./routers/transactionsRouter");

const { createServer } = require("http");

const cookieParser = require("cookie-parser");

//env
const env = require('dotenv');
env.config();

//options
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   tls: true,
//   tlsCAFile: `/home/${process.env.DIRECTORY}/.mongodb/root.crt`,
//   authSource: process.env.DB_NAME
// }
//mongoose
const mongoose = require("mongoose");
const { auth } = require("./middlewares/authMiddlewares");
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@127.0.0.1:27017/mohen?authSource=admin`)
// mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`, options)
.then((data) => {
  console.log("connected to mongoose");
})
.catch((err) => {
  mongoose.disconnect();
  console.log(err);
})

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  // origin: "*",
  origin: ["http://localhost:5173", "http://mohen-tohen.ru", "https://mohen-tohen.ru"],
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

app.listen(3000);

// app.listen(3000, () => {
//   console.log("yes");
// });