const cartModel = require("../Model/cartModel")

const addCart=async (req,res)=>{
  console.log("cartdata",req.user);
    try{
        const { productId, quantity } = req.body;
        const existingProduct = await cartModel.findOne({
      user: req.user.id,
      product: productId,
    });
    
    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
      await existingProduct.save();
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingProduct,
      });
    }

    const cart = await cartModel.create({
      user: req.user.id,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


// Get Logged-in User Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId",userId);

    const cartItemssss = await cartModel.find();

console.log(cartItemssss);
    
    const cartItems = await cartModel
      .find({ userId })
      .populate("productId");

    res.status(200).json({
      success: true,
      count: cartItems.length,
      data: cartItems,
    });
console.log("cartItems".cartItems);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports={addCart,getCart}