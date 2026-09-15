




const express = require("express");
const {addLike,getWishList,deleteWishList} = require("../Controller/wishlistController");
const authMiddleware = require("../middleware/auth");

const wishlistRouter = express.Router();

wishlistRouter.post("/", authMiddleware, addLike);
wishlistRouter.get("/", authMiddleware, getWishList);
wishlistRouter.delete("/delete/:wishlistId", authMiddleware, deleteWishList);

module.exports = wishlistRouter; 