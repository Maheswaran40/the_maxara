const express = require("express");
const productRouter = express.Router();
const {
  addData,
  getData,
  updateData,
  deleteData,
  getBanner
 
} = require("../Controller/productController");

const upload = require("../middleware/upload");
// REST API endpoints
productRouter.post("/addProduct",upload.single("image") ,addData);
productRouter.get("/getProduct", getData);
productRouter.get("/getBanner", getBanner);
productRouter.put("/updateProduct/:id",upload.single("image"),updateData);
productRouter.delete("/deleteProduct/:id", deleteData);

module.exports = productRouter;