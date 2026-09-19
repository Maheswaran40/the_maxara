const express = require("express");
const {addCart,getCart,deleteCart,updateCart} = require("../Controller/cartController");
const authMiddleware = require("../middleware/auth");

const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, addCart);
cartRouter.get("/", authMiddleware, getCart);
cartRouter.delete("/delete/:cartId", authMiddleware, deleteCart);
cartRouter.patch("/update/:cartId",authMiddleware,updateCart);
module.exports = cartRouter; 