const express = require("express");
const productRouter = express.Router();
const {
  addData,
  getData,
  updateData,
  deleteData,
 
} = require("../Controller/productController");

// REST API endpoints
productRouter.post("/addProduct", addData);
productRouter.get("/getProduct", getData);
productRouter.put("/updateProduct/:id", updateData);
productRouter.delete("/deleteProduct/:id", deleteData);

module.exports = productRouter;