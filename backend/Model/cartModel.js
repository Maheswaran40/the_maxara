const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdata",
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "images",
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    }

}, { timestamps: true });

cartModel= mongoose.model("Cart", cartSchema);
module.exports =cartModel