import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

function ProductPage() {
  const { productId } = useParams();

  const [selectProduct, setSelectProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET PRODUCT
  const getProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_API_GETPRODUCTS}?id=${productId}`
      );

      console.log("PRODUCT RESPONSE:", response.data);

      const products = response.data.products;

      if (!products || products.length === 0) {
        setError("Product not found");
        return;
      }

      const product = products[0];

      console.log("SELECTED PRODUCT:", product);

      setSelectProduct(product);

      // Your API product contains the image URL
      setProductImages([product]);
    } catch (err) {
      console.log(
        "Error fetching product:",
        err.response?.data || err.message
      );

      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [productId]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

          <p className="text-gray-600 text-sm font-medium">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white shadow-lg p-8 text-center">
          <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <i className="fa-solid fa-triangle-exclamation text-red-500 text-xl"></i>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            onClick={getProduct}
            className="mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================
  if (!selectProduct) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>

          <h2 className="text-2xl font-bold text-gray-800">
            Product not found
          </h2>

          <p className="mt-2 text-gray-500">
            We couldn't find this product.
          </p>
        </div>
      </div>
    );
  }

  const offerValue = parseInt(selectProduct.offer) || 0;

  return (
    <div className="w-full bg-gray-50 min-h-screen py-6 sm:py-8 lg:py-10">

      {/* =========================
          PRODUCT SECTION
      ========================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

          {/* =========================
              PRODUCT IMAGE
          ========================= */}
          <div className="w-full">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">

              <div className="w-full h-[350px] sm:h-[450px] lg:h-[520px] rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">

                <Swiper
                  spaceBetween={10}
                  pagination={{ clickable: true }}
                  loop={productImages.length > 1}
                  className="w-full h-full"
                >
                  {productImages.map((value, index) => (
                    <SwiperSlide
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <img
                        src={value.url}
                        alt={value.name || value.filename}
                        className="w-full h-full object-contain p-6 sm:p-10"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

              </div>

            </div>
          </div>

          {/* =========================
              PRODUCT INFORMATION
          ========================= */}
          <div className="w-full">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7 lg:p-8">

              {/* Product name */}
              <div className="border-b border-gray-100 pb-5">

                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider mb-2">
                  {selectProduct.folder}
                </p>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold capitalize text-gray-900 leading-tight">
                  {selectProduct.name}
                </h1>

              </div>

              {/* =========================
                  PRICE
              ========================= */}
              <div className="flex flex-wrap items-center gap-3 py-5">

                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                  ₹ {selectProduct.price.toLocaleString("en-IN")}
                </span>

                <span className="text-sm sm:text-base text-gray-400">
                  MRP
                  <span className="ml-2 line-through">
                    ₹{selectProduct.dashprice.toLocaleString("en-IN")}
                  </span>
                </span>

                {offerValue > 0 && (
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-bold ${
                      offerValue >= 35
                        ? "bg-red-500 text-white"
                        : "bg-yellow-300 text-gray-900"
                    }`}
                  >
                    {selectProduct.offer} off
                  </span>
                )}

              </div>

              {/* =========================
                  CLOTHING SIZE
              ========================= */}
              {["tshirts", "shirts", "pants", "sleeves"].includes(
                selectProduct.folder
              ) && (
                <div className="py-5 border-t border-gray-100">

                  <p className="text-sm font-bold text-gray-800 mb-3">
                    SELECT SIZE
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {["S", "M", "M/L", "L", "XL", "2XL"].map((size) => (
                      <button
                        key={size}
                        className="h-11 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition"
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                </div>
              )}

              {/* =========================
                  BAG SIZE
              ========================= */}
              {(selectProduct.folder === "bags" ||
                selectProduct.name.toLowerCase().includes("bag")) && (
                <div className="py-5 border-t border-gray-100">

                  <p className="text-sm font-bold text-gray-800 mb-3">
                    SELECT SIZE
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Small", "Medium", "Large", "Extra Large"].map(
                      (size) => (
                        <button
                          key={size}
                          className="h-11 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition"
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>

                </div>
              )}

              {/* =========================
                  CAP SIZE
              ========================= */}
              {selectProduct.folder === "caps" && (
                <div className="py-5 border-t border-gray-100">

                  <p className="text-sm font-bold text-gray-800 mb-3">
                    SELECT SIZE
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["Free Size", "54 cm", "56 cm", "58 cm", "60 cm"].map(
                      (size) => (
                        <button
                          key={size}
                          className="h-11 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition"
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>

                </div>
              )}

              {/* =========================
                  SHOE SIZE
              ========================= */}
              {selectProduct.folder === "shoes" && (
                <div className="py-5 border-t border-gray-100">

                  <p className="text-sm font-bold text-gray-800 mb-3">
                    SELECT SIZE
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {["6", "7", "8", "9", "10", "11"].map((size) => (
                      <button
                        key={size}
                        className="h-11 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition"
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                </div>
              )}

              {/* =========================
                  BUTTONS
              ========================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                <button
                  className="h-12 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <i className="fa-regular fa-heart"></i>
                  Add to Wishlist
                </button>

                <button
                  className="h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  Add to Cart
                </button>

              </div>

              {/* =========================
                  DESCRIPTION
              ========================= */}
              <div className="mt-7 pt-6 border-t border-gray-100">

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Description
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-7">
                  {selectProduct.desc}
                </p>

              </div>

              {/* =========================
                  SELLER
              ========================= */}
              <div className="mt-6 p-4 rounded-xl bg-gray-50">

                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                  Seller Details
                </p>

                <p className="mt-2 text-sm text-gray-700">
                  Sold and Fulfilled by -{" "}
                  <span className="font-semibold">
                    Maxara Sports India Pvt Ltd
                  </span>
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* =========================
            PRODUCT DETAILS
        ========================= */}
        <div className="mt-8 space-y-4">

          {/* PRODUCT DETAILS */}
          <details className="group bg-white rounded-2xl border border-gray-100 shadow-sm">

            <summary className="cursor-pointer list-none px-5 sm:px-6 py-5 flex items-center justify-between font-bold text-gray-900">
              PRODUCT DETAILS

              <span className="text-xl transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-gray-600 leading-7">

              <p>
                At the foot of Mont Blanc, our team of designers has
                developed these lightweight, breathable trousers for
                occasional mountain walking.
              </p>

              <div className="mt-5">

                <h4 className="font-bold text-gray-900 mb-3">
                  BENEFITS
                </h4>

                <div className="space-y-3">

                  <p>
                    <b>Breathability:</b> Lightweight synthetic fabric that
                    wicks the perspiration away from the body.
                  </p>

                  <p>
                    <b>Lightweight:</b> Only 230 g in size L.
                  </p>

                  <p>
                    <b>Quick drying:</b> Synthetic fabric that dries quickly
                    when wet with perspiration.
                  </p>

                  <p>
                    <b>Anatomic design:</b> Semi-elasticated waist.
                  </p>

                  <p>
                    <b>Freedom of movement:</b> Stretch fabric and preformed
                    knees.
                  </p>

                </div>
              </div>
            </div>
          </details>

          {/* PRODUCT SPECIFICATION */}
          <details className="group bg-white rounded-2xl border border-gray-100 shadow-sm">

            <summary className="cursor-pointer list-none px-5 sm:px-6 py-5 flex items-center justify-between font-bold text-gray-900">
              PRODUCT SPECIFICATION

              <span className="text-xl transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="px-5 sm:px-6 pb-6">

              <div className="divide-y divide-gray-100">

                {[
                  ["Type of belt", "Semi-elasticated belt"],
                  ["Modular", "Not modular"],
                  ["Waterproof", "No waterproof"],
                  ["Type of belt", "Elasticated belt, drawstring belt"],
                  ["Number of pockets", "2 pockets"],
                  ["Stitching type", "With seam"],
                  ["Belt height", "Mid waistband"],
                  ["Level of practice", "All levels"],
                  ["Type of length", "Short"],
                ].map(([title, value], index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 text-sm"
                  >
                    <p className="font-semibold text-gray-700">
                      {title}
                    </p>

                    <p className="text-gray-500">
                      {value}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </details>

          {/* TECHNICAL INFORMATION */}
          <details className="group bg-white rounded-2xl border border-gray-100 shadow-sm">

            <summary className="cursor-pointer list-none px-5 sm:px-6 py-5 flex items-center justify-between font-bold text-gray-900">
              TECHNICAL INFORMATION

              <span className="text-xl transition-transform group-open:rotate-180">
                ↓
              </span>
            </summary>

            <div className="px-5 sm:px-6 pb-6">

              <div className="divide-y divide-gray-100">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 text-sm">
                  <p className="font-semibold text-gray-700">
                    Size
                  </p>
                  <p className="text-gray-500">
                    S, XL, L, M, 2XL
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 text-sm">
                  <p className="font-semibold text-gray-700">
                    Length
                  </p>
                  <p className="text-gray-500">
                    These shorts have a short inside leg length of 16 cm
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 text-sm">
                  <p className="font-semibold text-gray-700">
                    Warranty
                  </p>
                  <p className="text-gray-500">
                    2
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 text-sm">
                  <p className="font-semibold text-gray-700">
                    Country of origin
                  </p>
                  <p className="text-gray-500">
                    India
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4 text-sm">
                  <p className="font-semibold text-gray-700">
                    MRP
                  </p>
                  <p className="font-semibold text-gray-900">
                    ₹ {selectProduct.price.toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

            </div>
          </details>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;

