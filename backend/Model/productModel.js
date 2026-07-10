const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: { type: String, unique: true }, // 👈 unique index
  url: String,
  folder: String,
  name: String,          // product name
  price: Number,
  category: String,
  desc: String   ,
  offer: String,     // add this
  dashprice: Number        // product description
});

const productSchema = mongoose.model("images", imageSchema); // <- collection name 'images'
module.exports = productSchema