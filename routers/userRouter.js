const express = require("express");
const userRouter = express();

const { auth } = require("../middlewares/authMiddlewares");

const {loginUser, getOTPCode, getSellers, getSeller, getUser, updateBasket, updateFavourites} = require("../controllers/User");

userRouter.post("/otp", getOTPCode);
userRouter.post("/login", loginUser);

userRouter.get("/me", auth, getUser);

userRouter.get("/sellers", getSellers);
userRouter.get("/sellers/:id", getSeller);

userRouter.post("/me/basket", auth, updateBasket);
userRouter.post("/me/favourites", auth, updateFavourites);

module.exports = {
    userRouter,
}