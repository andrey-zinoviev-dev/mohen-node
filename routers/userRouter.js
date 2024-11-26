const express = require("express");
const userRouter = express();

const { auth } = require("../middlewares/authMiddlewares");

const {loginUser, getOTPCode, getSellers, getSeller, getUser, updateBasket, updateFavourites, userLogout, updateBasketGood, deleteBasketGood, updateUser} = require("../controllers/User");

userRouter.post("/otp", getOTPCode);
userRouter.post("/login", loginUser);
userRouter.put("/logout", userLogout);

userRouter.get("/me", auth, getUser);

userRouter.get("/sellers", getSellers);
userRouter.get("/sellers/:id", getSeller);

userRouter.post("/me/basket", auth, updateBasket);
userRouter.put("/me/basket/updateItem", auth, updateBasketGood);
userRouter.put("/me/basket/deleteItem", auth, deleteBasketGood);
userRouter.post("/me/favourites", auth, updateFavourites);
userRouter.put("/me/edit", auth, updateUser)
// user

module.exports = {
    userRouter,
}