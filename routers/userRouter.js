const express = require("express");
const userRouter = express();

const {loginUser, getOTPCode} = require("../controllers/User");

userRouter.post("/otp", getOTPCode);
userRouter.post("/login", loginUser);

module.exports = {
    userRouter,
}