const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: {
    type: String, required: true,
    unique: true
  }, 
  url: {
    type: String,
    required: true
  },

  folder: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },

  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },

  desc: {
    type: String,
    required: true,
    trim: true
  },

  offer: {
    type: String,
    default: ""
  },

  dashprice: {
    type: Number,
    required: true
  }       
},
 {
    timestamps: true
  }
);

const productSchema = mongoose.model("images", imageSchema); // <- collection name 'images'
module.exports = productSchema