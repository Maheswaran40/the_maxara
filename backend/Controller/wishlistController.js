const likeModel = require("../Model/wishlist")

const addLike = async (req, res) => {
  console.log("likeData fun", req.user);
  try {
    const { productId } = req.body;
    const existingPro = await likeModel.findOne({
      user: req.user.id,
      product: productId
    })

    if (existingPro) {
      console.log("already saved");
      return res.status(202).json({
        success: false,
        message: "already in wishlist",
        wishlist: existingPro,
      })

    }


    const wishlist = await likeModel.create({
      user: req.user.id,
      product: productId,
    })
    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

}



// Get Logged-in User like
const getWishList = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("GET LIKE userId:", userId);

    const wishListItems = await likeModel
      .find({ user: userId })
      .populate("product");

   console.log(
  "POPULATED PRODUCT:",
  wishListItems[0]?.product
);

    return res.status(200).json({
      success: true,
      count: wishListItems.length,
      data: wishListItems,
    });

  } catch (error) {
    console.log("GET Wishlist ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const deleteWishList = async (req, res) => {
  try {
    const { wishlistId  } = req.params;

    const wishListItem = await likeModel.findOneAndDelete({
      _id: wishlistId,
      user: req.user.id,
    });

    if (!wishListItem) {
      return res.status(404).json({
        success: false,
        message: "wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product removed from wishList uccessfully",
      data: wishListItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = { addLike, getWishList, deleteWishList }