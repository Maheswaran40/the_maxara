const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
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

}, { timestamps: true });

likeModel= mongoose.model("like", likeSchema);
module.exports =likeModel