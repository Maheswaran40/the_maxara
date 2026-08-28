const productSchema = require("../Model/productModel");

//  Add product
const addData = async (req, res) => {
  try {
    const product_Data = new productSchema({
      folder: req.body.folder,
      filename: req.body.filename,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      desc: req.body.desc,
      url: req.body.url   // will contain base64 string    
    });

    await product_Data.save();
    res.status(200).send("Data added successfully");
  } catch (err) {
    res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
  }
};

const getData = async (req, res) => {
  try {
    const {
      id,
      folder,
      search,
      price,
      limit = 10,
      page = 1
    } = req.query;

    let query = {};

    // Search by ID
    if (id) {
      query._id = id;
    }

    // Search by folder
    if (folder) {
      query.folder = folder;
    }

    // Search by price (less than)
    if (price) {
      query.price = { $lt: Number(price) };
    }

    // Search by name
    if (search) {
      query.name = {
        $regex: search,
        $options: "i"
      };
    }

    const products = await productSchema
      .find(query)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await productSchema.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      products
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// get banner image

const getBanner = async (req, res) => {

  try {
    let dataBanner = await productSchema.find({ category: "homehero1" })
    let roundBatch = await productSchema.find({ category: "homecard1" })
    let brandlogo = await productSchema.find({ folder: "brandlogo" })
    let budgetCard = await productSchema.find({ category: "budget sport shopping", folder: "homepage" })
    let dataBanner2 = await productSchema.find({ category: "homehero2", folder: "homepage" })
    let steelDeal = await productSchema.find({ category: "steal_deal_card" })
    let newarrival = await productSchema.find({
      category: "newarrival"
    });

    let hoverimage = await productSchema.find({ category: "hover" })
    res.status(200).json({ dataBanner, roundBatch, newarrival, 
      hoverimage, brandlogo, budgetCard, dataBanner2, steelDeal })
    console.log("data", data);

  }

  catch (err) {
    res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
    console.log("getBanner", err)
  }

}


// Update product by ID
const updateData = async (req, res) => {
  try {
    const updateProduct = await productSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updateProduct);
  } catch (err) {
    res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
  }
};

//  Delete product by ID
const deleteData = async (req, res) => {
  try {
    await productSchema.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Deleted successfully " });
  } catch (err) {
    res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
  }
};

module.exports = {
  addData,
  getData,
  updateData,
  deleteData,
  getBanner

};
