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

// //  Get all products
// const getData = async (req, res) => {
//   try {
//     const getproduct = await productSchema.find().limit(5);
//     res.status(200).send(getproduct);
//   } catch (err) {
//     res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
//   }
// };


// // Get by id single product
// const getDatabyProduct = async (req, res) => {
//   try {
//     const getproductbyid = await productSchema.find({ _id: req.params.id });
//     res.status(200).send(getproductbyid);
//   } catch (err) {
//     res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
//   }
// };

// // Get Product By price
// const getDatabyPrice = async (req, res) => {
//   try {
//     let price = Number(req.params.price)
//     const getproductbyPrice = await productSchema.find({ price: { $lt: price } });
//     const productCount = await productSchema.countDocuments({ price: { $lt: price } });
//     console.log("req.params.price", productCount);
//     res.status(200).json({
//       getproductbyPrice,
//       productCount
//     });

//   } catch (err) {
//     res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
//   }
// };


// // Get by folder [cpas,cycle,bags etc...]
// const getDatabyfolder = async (req, res) => {
//   try {
//     const folderData = await productSchema.find({ folder: req.params.folder })

//     res.status(200).send(folderData)
//   }
//   catch (err) {
//     res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
//     console.log("error from getDatabyfolder");
//   }
// }

// // search Function
// const searchFun = async (req, res) => {
//   try {
   
    
//     const searchData = await productSchema.find({
//       $or: [
//         { name: { $regex: req.params.searchInput, $options: "i" } },
//         { price: Number(req.params.searchInput) || -1 }
//       ]
//     });
//     res.status(200).json(searchData)
//     console.log(searchData);
    
//   }
//   catch (err) {
//     res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
//     console.log("error from searchFun");
//   }
// }

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
  // getDatabyfolder,
  // getDatabyProduct,
  // getDatabyPrice,
  // searchFun
};
