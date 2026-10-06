const productSchema = require("../Model/productModel");
const cloudinary = require("../config/cloudinary");
//  Add product
const addData = async (req, res) => {
  console.log("BODY:", req.body);
    console.log("FILE:", req.file);
  try {

    let cloudinaryData = {};

    if (req.file) {

      const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: req.body.folder || "maxara"
          },
          (error, result) => {

            if (error) {
              reject(error);
            } else {
              resolve(result);
            }

          }
        );

        stream.end(req.file.buffer);

      });

      cloudinaryData = {
        url: result.secure_url,
        filename: result.public_id
      };
    }


    const product_Data = new productSchema({

      folder: req.body.folder,
      filename: cloudinaryData.filename || req.body.filename,
      name: req.body.name,
      price: req.body.price,
      dashprice: req.body.dashprice,
      category: req.body.category,
      desc: req.body.desc,
      // Cloudinary URL
      url: cloudinaryData.url || req.body.url

    });


    await product_Data.save();

    res.status(200).send("Data added successfully");

  } catch (err) {
    console.log("ADD PRODUCT ERROR:", err);
    res.status(500).send(
      `Error name: ${err.name}, message: ${err.message}`
    );

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
    let bag_banner = await productSchema.find({ category: "bag_banner" })
    let bag_card = await productSchema.find({ category: "bag_card" })
    let newarrival = await productSchema.find({
      category: "newarrival"
    }).limit(10);

    let hoverimage = await productSchema.find({ category: "hover" })
    res.status(200).json({ dataBanner, roundBatch, newarrival, 
      hoverimage, brandlogo, budgetCard, dataBanner2, steelDeal ,bag_banner,bag_card})

  }

  catch (err) {
    res.status(404).send(`Error name: ${err.name}, message: ${err.message}`);
    console.log("getBanner", err)
  }

}


const updateData = async (req, res) => {

  try {

    let updateFields = {
      ...req.body
    };


    // If a new image is uploaded
    if (req.file) {

      // First get existing product
      const existingProduct = await productSchema.findById(
        req.params.id
      );


      // Delete old Cloudinary image
      if (existingProduct && existingProduct.filename) {

        try {

          await cloudinary.uploader.destroy(
            existingProduct.filename
          );

        } catch (cloudinaryError) {

          console.log(
            "Old Cloudinary image delete error:",
            cloudinaryError.message
          );

        }

      }


      // Upload new image
      const result = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: req.body.folder ||
              existingProduct.folder ||
              "maxara"
          },
          (error, result) => {

            if (error) {
              reject(error);
            } else {
              resolve(result);
            }

          }
        );

        stream.end(req.file.buffer);

      });


      // Replace only image information
      updateFields.url = result.secure_url;
      updateFields.filename = result.public_id;

    }


    const updateProduct =
      await productSchema.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true }
      );


    res.status(200).send(updateProduct);

  } catch (err) {

    res.status(404).send(
      `Error name: ${err.name}, message: ${err.message}`
    );

  }

};

const deleteData = async (req, res) => {

  try {

    // Find product first
    const product = await productSchema.findById(
      req.params.id
    );


    // Delete image from Cloudinary
    if (product && product.filename) {

      try {

        await cloudinary.uploader.destroy(
          product.filename
        );

      } catch (cloudinaryError) {

        console.log(
          "Cloudinary delete error:",
          cloudinaryError.message
        );

      }

    }


    // Your existing MongoDB deletion
    await productSchema.findByIdAndDelete(
      req.params.id
    );


    res.status(200).send({
      message: "Deleted successfully "
    });

  } catch (err) {

    res.status(404).send(
      `Error name: ${err.name}, message: ${err.message}`
    );

  }

};

module.exports = {
  addData,
  getData,
  updateData,
  deleteData,
  getBanner

};
