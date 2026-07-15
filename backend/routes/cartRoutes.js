const express = require("express");
const { addCart,getCart } = require("../Controller/cartController");
const authMiddleware = require("../middleware/auth");

const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, addCart);
cartRouter.get("/", authMiddleware, getCart);

module.exports = cartRouter; 