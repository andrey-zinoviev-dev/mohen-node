const express = require("express");

const app = express();

const cors = require("cors");

const { router } = require("./routers/router");
const { userRouter } = require("./routers/userRouter");

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

app.listen(3001, () => {
  console.log("yes");
});