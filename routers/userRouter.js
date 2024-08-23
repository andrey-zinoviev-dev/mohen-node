const express = require("express");
const userRouter = express();

const {loginUser, getOTPCode, getSellers, getSeller} = require("../controllers/User");

userRouter.post("/otp", getOTPCode);
userRouter.post("/login", loginUser);

userRouter.get("/sellers", getSellers);
userRouter.get("/sellers/:id", getSeller);

module.exports = {
    userRouter,
}