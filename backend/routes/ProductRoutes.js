const express = require("express");
const productRouter = express.Router();
const {
  addData,
  getData,
  updateData,
  deleteData,
  // getDatabyfolder,
  // getDatabyProduct,
  // getDatabyPrice,
  // searchFun
} = require("../Controller/productController");

// REST API endpoints
productRouter.post("/addProduct", addData);
productRouter.get("/getProduct", getData);
// productRouter.get("/getProduct/product/:id", getDatabyProduct);
// productRouter.get("/getProduct/search/:searchInput", searchFun);
// productRouter.get("/getProduct/price/:price", getDatabyPrice);
// productRouter.get("/getProduct/folder/:folder", getDatabyfolder);
productRouter.put("/updateProduct/:id", updateData);
productRouter.delete("/deleteProduct/:id", deleteData);

module.exports = productRouter;