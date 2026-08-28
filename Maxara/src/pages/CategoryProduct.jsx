// CategoryProduct.jsx - Complete Component with Visible Pagination
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  ShoppingBag,
  Filter,
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function CategoryProduct() {
  const { folder } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [rangevalue, setRangevalue] = useState(3000);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 8;

  // Fetch products with pagination
  const getCategoryProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(import.meta.env.VITE_API_GETPRODUCTS, {
        params: {
          folder: folder,
          page: currentPage,
          limit: itemsPerPage,
          category: folder,
          sort: sortBy,
          minPrice: rangevalue === 3000 ? 0 : 100,
          maxPrice: rangevalue,
        },
      });

      console.log("API Response:", response.data); // Debug log

      // Handle different API response structures
      let productsData = [];
      let totalProductsCount = 0;
      let totalPagesCount = 1;

      if (response.data.products) {
        productsData = response.data.products;
        totalProductsCount =
          response.data.totalProducts ||
          response.data.total ||
          response.data.count ||
          productsData.length;
        totalPagesCount =
          response.data.totalPages ||
          response.data.pages ||
          Math.ceil(totalProductsCount / itemsPerPage);
      } else if (Array.isArray(response.data)) {
        productsData = response.data;
        totalProductsCount = productsData.length;
        totalPagesCount = Math.ceil(totalProductsCount / itemsPerPage);
      } else if (response.data.data) {
        productsData = response.data.data;
        totalProductsCount =
          response.data.total ||
          response.data.totalProducts ||
          productsData.length;
        totalPagesCount =
          response.data.totalPages ||
          Math.ceil(totalProductsCount / itemsPerPage);
      }

      setProducts(productsData);
      setTotalProducts(totalProductsCount);
      setTotalPages(totalPagesCount > 0 ? totalPagesCount : 1);

      console.log("Total Products:", totalProductsCount);
      console.log("Total Pages:", totalPagesCount);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (folder) {
      setCurrentPage(1);
      getCategoryProducts();
    }
  }, [folder]);

  useEffect(() => {
    if (folder) {
      getCategoryProducts();
    }
  }, [currentPage, sortBy]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  // Get category display name
  const getCategoryName = () => {
    const names = {
      bags: "Bags & Backpacks",
      cycle: "Cycling & Skating",
      hiking: "Hiking & Trekking",
      rain: "Rain Essential",
      shoes: "Shoes",
      sports: "Sports & Accessories",
    };
    return names[folder] || folder?.replace("-", " ") || "Products";
  };

  const sortOptions = [
    "Most Relevant",
    "Price: Low to High",
    "Price: High to Low",
    "Rating",
    "Popular",
  ];

  // Handle product click to navigate to product detail
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Calculate pagination range
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalProducts);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{error}</h3>
          <button
            onClick={getCategoryProducts}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight">
          {getCategoryName()}
        </h1>

        {/* Breadcrumb */}
        <div className="text-center text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 font-medium">{getCategoryName()}</span>
        </div>

        {/* Filter Bar - Mobile */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-700">Filters</span>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                8
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside
            className={`lg:w-72 xl:w-80 flex-shrink-0 ${isFilterOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Clear All
                </button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Price Range
                </h4>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    ₹100
                  </span>
                  <input
                    type="range"
                    min={100}
                    max={3000}
                    value={rangevalue}
                    onChange={(e) => setRangevalue(Number(e.target.value))}
                    className="flex-1 h-2 bg-gradient-to-r from-blue-200 to-blue-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    ₹3000
                  </span>
                </div>
                <div className="text-center text-sm font-semibold text-blue-600">
                  ₹{rangevalue.toLocaleString("en-IN")}
                </div>
              </div>

              {/* Filter Sections */}
              <FilterSection title="Gender" items={filters.gender} />
              <FilterSection title="Brand" items={filters.brand} />
              <FilterSection title="Colors" items={filters.colors} isColor />
              <FilterSection title="Sports" items={filters.sports} />
              <FilterSection title="Discount" items={filters.discount} />
              <FilterSection title="Rating" items={filters.rating} />
            </div>
          </aside>

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ArrowUpDown className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {startIndex}-{endIndex}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {totalProducts}
                </span>{" "}
                products
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {products
                    .filter((product) => product.category !== "hover")
                    .map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        products={products}
                        onProductClick={handleProductClick}
                      />
                    ))}
                </div>

                {/* ✅ PAGINATION - Always show if totalPages > 1 */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}

                {/* Debug info - remove after testing */}
                {console.log(
                  "Total Pages:",
                  totalPages,
                  "Current Page:",
                  currentPage,
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No Products Available
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or check back later
                </p>
                <Link
                  to="/"
                  className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ PAGINATION COMPONENT - Enhanced and Visible
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at start
      if (currentPage <= 3) {
        endPage = 4;
      }
      // Adjust if at end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(i);
        }
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-100">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-md shadow-blue-500/30"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 mx-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`min-w-[44px] h-11 rounded-xl font-semibold transition-all duration-200 ${
              page === currentPage
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 scale-110"
                : page === "..."
                  ? "text-gray-400 cursor-default"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-md shadow-blue-500/30"
        }`}
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// Filter Section Component
const FilterSection = ({ title, items, isColor = false }) => {
  return (
    <div className="mb-6 pb-6 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
      <h4 className="font-semibold text-gray-700 mb-3">{title}</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {items.map((item, index) => (
          <label
            key={index}
            className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-all duration-200"
          >
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            />
            {isColor && item.color && (
              <span
                className="w-5 h-5 rounded-full border-2 border-gray-200 flex-shrink-0"
                style={{
                  backgroundColor: item.color,
                  borderColor: item.border ? "#E5E7EB" : item.color,
                }}
              />
            )}
            <span className="text-sm text-gray-600 group-hover:text-gray-800">
              {item.label}
              <span className="text-gray-400 ml-1">({item.count})</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product, products, onProductClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const hoverImage = products?.find(
    (item) =>
      item.category === "hover" &&
      item.name.replace(" hover", "") === product.name,
  );

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image Container */}
      <div
        className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onProductClick(product._id)}
      >
        {/* Normal Product Image */}
        <img
          src={product.url}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered && hoverImage?.url ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* ONLY THIS PRODUCT'S HOVER IMAGE */}
        {hoverImage?.url && (
          <img
            src={hoverImage.url}
            alt={`${product.name} hover`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-30 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Discount Badge */}
        {product.offer && (
          <div className="absolute top-3 left-3 z-30 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold px-2 py-1.5 rounded-full shadow-lg">
            {product.offer} OFF
          </div>
        )}

        {/* Quick View */}
        <div
          className={`absolute inset-0 z-20 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product._id);
            }}
            className="bg-white text-gray-800 px-6 py-2.5 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price?.toLocaleString("en-IN")}
          </span>

          {product.dashprice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.dashprice.toLocaleString("en-IN")}
            </span>
          )}

          {product.offer && (
            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              {product.offer} OFF
            </span>
          )}
        </div>
        {/* <div className="flex items-center gap-1 mb-3 mt-2">
          <div className="flex text-yellow-400">
            {"⭐".repeat(4)}
            <span className="text-gray-300">⭐</span>
          </div>
          <span className="text-xs text-gray-500">(24)</span>
        </div> */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart
          }}
          className="w-full bg-gradient-to-r from-blue-600 mt-2 to-indigo-600 text-white py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Sample filter data
const filters = {
  gender: [
    { label: "Men", count: 122 },
    { label: "Women", count: 80 },
    { label: "Boys", count: 15 },
    { label: "Girls", count: 38 },
    { label: "Baby boys", count: 17 },
    { label: "Baby girls", count: 17 },
  ],
  brand: [
    { label: "Adidas", count: 40 },
    { label: "Kalenji", count: 20 },
    { label: "Maxara", count: 75 },
    { label: "Dynafit", count: 38 },
    { label: "NewFeel", count: 17 },
    { label: "Tarmak", count: 17 },
  ],
  colors: [
    { label: "White", count: 40, color: "#FFFFFF", border: true },
    { label: "Red", count: 20, color: "#EF4444" },
    { label: "Blue", count: 75, color: "#3B82F6" },
    { label: "Gray", count: 38, color: "#9CA3AF" },
    { label: "Brown", count: 17, color: "#92400E" },
    { label: "Green", count: 17, color: "#22C55E" },
    { label: "Black", count: 32, color: "#1F2937" },
  ],
  sports: [
    { label: "Running", count: 56 },
    { label: "Jogging", count: 34 },
    { label: "Multisport", count: 35 },
    { label: "Walking", count: 13 },
    { label: "Gymnastics", count: 27 },
    { label: "BasketBall", count: 9 },
  ],
  discount: [
    { label: "10% and below", count: 126 },
    { label: "10% and above", count: 6 },
    { label: "20% and above", count: 36 },
    { label: "30% and above", count: 15 },
    { label: "40% and above", count: 10 },
    { label: "50% and above", count: 1 },
    { label: "60% and above", count: 1 },
    { label: "70% and above", count: 5 },
  ],
  rating: [
    { label: "Above ⭐⭐⭐⭐", count: 81 },
    { label: "Above ⭐⭐⭐", count: 0 },
    { label: "Above ⭐⭐", count: 0 },
    { label: "Above ⭐", count: 0 },
    { label: "No Rating", count: 119 },
  ],
};

export default CategoryProduct;
