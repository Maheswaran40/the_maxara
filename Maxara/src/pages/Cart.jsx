import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, deleteCart } from "../redux/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, loading, loaded } = useSelector((state) => state.cart);
  console.log("cartItems from cart", cartItems);

  // Get cart when page loads
  useEffect(() => {
    if (!loaded) {
      dispatch(getCart());
    }
  }, [dispatch, loaded]);

  // Delete cart item
const handleDelete = async (cartId) => {
  console.log("DELETE CART ID RECEIVED:", cartId);

  const result = await dispatch(deleteCart(cartId));

  if (deleteCart.fulfilled.match(result)) {
    console.log("DELETE SUCCESS:", result);
  } else {
    console.log("DELETE FAILED:", result);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500 text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">Home / Cart</p>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                My Cart
              </h1>

              <p className="text-gray-500 mt-2">
                Review your items before checkout
              </p>
            </div>

            {cartItems?.length > 0 && (
              <div className="hidden sm:block bg-white border border-gray-200 px-4 py-2 rounded-full">
                <span className="text-sm text-gray-600">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= EMPTY CART ================= */}

        {cartItems?.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-16 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 4h13m-9 4a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-6">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet.
            </p>

            <button className="mt-6 bg-black text-white px-7 py-3 rounded-xl font-medium hover:bg-gray-800 transition">
              Continue Shopping
            </button>
          </div>
        ) : (
          /* ================= CART CONTENT ================= */

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ================= PRODUCTS ================= */}

            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                console.log("CART ITEM:", item);
                console.log("CART ID:", item._id);
                console.log("PRODUCT ID:", item.product?._id);
                return (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">
                      {/* PRODUCT IMAGE */}

                      <div className="w-full sm:w-40 h-48 sm:h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.product?.url}
                          alt={item.product?.name}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />
                      </div>

                      {/* PRODUCT INFO */}

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                                Maxara
                              </p>

                              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                {item.product?.name}
                              </h2>
                            </div>

                            {/* DELETE */}

                            <button
                              onClick={() => {
                                console.log("DELETE BUTTON ITEM:", item);
                                console.log("DELETE BUTTON CART ID:", item._id);

                                dispatch(deleteCart(item._id));
                              }}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.8"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8"
                                />
                              </svg>
                            </button>
                          </div>

                          <p className="text-sm text-gray-500 mt-2">
                            Product ID: {item.product?._id}
                          </p>
                        </div>

                        {/* BOTTOM */}

                        <div className="flex items-center justify-between mt-6">
                          {/* QUANTITY */}

                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                              Quantity
                            </p>

                            <div className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium">
                              {item.quantity}
                            </div>
                          </div>

                          {/* PRICE */}

                          <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                              Price
                            </p>

                            <p className="text-xl font-bold text-gray-900">
                              ₹ {item.product?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:sticky lg:top-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="border-t border-gray-100 my-6"></div>

                {/* ITEMS */}

                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Items</span>

                  <span className="font-medium text-gray-900">
                    {cartItems.length}
                  </span>
                </div>

                {/* SUBTOTAL */}

                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium text-gray-900">
                    ₹{" "}
                    {cartItems.reduce(
                      (total, item) =>
                        total + (item.product?.price || 0) * item.quantity,
                      0,
                    )}
                  </span>
                </div>

                {/* SHIPPING */}

                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500">Delivery</span>

                  <span className="text-green-600 font-medium">FREE</span>
                </div>

                <div className="border-t border-gray-100 my-5"></div>

                {/* TOTAL */}

                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-gray-900">
                    ₹{" "}
                    {cartItems.reduce(
                      (total, item) =>
                        total + (item.product?.price || 0) * item.quantity,
                      0,
                    )}
                  </span>
                </div>

                {/* CHECKOUT */}

                <button className="w-full mt-6 bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 active:scale-[0.98] transition">
                  Proceed to Checkout
                </button>

                {/* SECURITY */}

                <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2zm10-10V5a4 4 0 00-8 0v2h8z"
                    />
                  </svg>
                  Secure checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
