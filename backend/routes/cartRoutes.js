const express = require("express");
const {addCart,getCart,deleteCart} = require("../Controller/cartController");
const authMiddleware = require("../middleware/auth");

const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, addCart);
cartRouter.get("/", authMiddleware, getCart);
cartRouter.delete("/delete/:cartId", authMiddleware, deleteCart);

module.exports = cartRouter; 