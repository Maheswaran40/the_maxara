import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../redux/product/productSlice";

import ProductTable from "../components/ProductTable";

import ProductForm from "../components/ProductForm";

import ConfirmModal from "../components/ConfirmModal";

import { useNavigate } from "react-router-dom";


function Products() {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();


  const {
    products,
    total,
    page,
    limit,
    loading,
    actionLoading,
  } = useSelector(
    (state) => state.product
  );


  // ============================================
  // FILTERS
  // ============================================

  const [search, setSearch] =
    useState("");

  const [folder, setFolder] =
    useState("");

  const [price, setPrice] =
    useState("");


  const [currentPage, setCurrentPage] =
    useState(1);


  // ============================================
  // EDIT MODAL
  // ============================================

  const [editProduct, setEditProduct] =
    useState(null);


  // ============================================
  // DELETE MODAL
  // ============================================

  const [deleteTarget, setDeleteTarget] =
    useState(null);


  // ============================================
  // GET PRODUCTS
  // ============================================

  useEffect(() => {

    dispatch(
      getProducts({
        page: currentPage,
        limit: 10,
        search,
        folder,
        price,
      })
    );

  }, [
    dispatch,
    currentPage,
    search,
    folder,
    price,
  ]);


  // ============================================
  // SEARCH
  // ============================================

  function handleSearch(e) {

    setSearch(e.target.value);

    setCurrentPage(1);

  }


  // ============================================
  // CLEAR FILTER
  // ============================================

  function clearFilters() {

    setSearch("");

    setFolder("");

    setPrice("");

    setCurrentPage(1);

  }


  // ============================================
  // EDIT
  // ============================================

  function handleEdit(product) {

    setEditProduct(product);

  }


  // ============================================
  // UPDATE
  // ============================================

  async function handleUpdate(
    formData
  ) {

    try {

      await dispatch(
        updateProduct({
          id: editProduct._id,
          formData,
        })
      ).unwrap();


      setEditProduct(null);


      dispatch(
        getProducts({
          page: currentPage,
          limit: 10,
          search,
          folder,
          price,
        })
      );

    } catch (error) {

      alert(
        typeof error === "string"
          ? error
          : "Update failed"
      );

    }

  }


  // ============================================
  // DELETE
  // ============================================

  async function handleDelete() {

    if (!deleteTarget) return;


    try {

      await dispatch(
        deleteProduct(
          deleteTarget._id
        )
      ).unwrap();


      setDeleteTarget(null);


      dispatch(
        getProducts({
          page: currentPage,
          limit: 10,
          search,
          folder,
          price,
        })
      );

    } catch (error) {

      alert(
        typeof error === "string"
          ? error
          : "Delete failed"
      );

    }

  }


  // ============================================
  // PAGINATION
  // ============================================

  const totalPages =
    Math.ceil(
      total / limit
    );


  function previousPage() {

    if (currentPage > 1) {

      setCurrentPage(
        currentPage - 1
      );

    }

  }


  function nextPage() {

    if (
      currentPage < totalPages
    ) {

      setCurrentPage(
        currentPage + 1
      );

    }

  }


  // ============================================
  // REFRESH
  // ============================================

  function refreshProducts() {

    dispatch(
      getProducts({
        page: currentPage,
        limit: 10,
        search,
        folder,
        price,
      })
    );

  }


  return (

    <div className="space-y-6">


      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-2xl font-bold text-slate-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your complete product catalog.
          </p>

        </div>


        <button
          onClick={() =>
            navigate("/products/add")
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >

          <Plus size={18} />

          Add Product

        </button>

      </div>


      {/* ==========================================
          FILTER PANEL
      ========================================== */}

      <div className="rounded-xl bg-white p-4 shadow-sm">

        <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_auto_auto]">


          {/* SEARCH */}

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search product name..."
              className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />

          </div>


          {/* FOLDER */}

          <input
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Folder"
            className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />


          {/* PRICE */}

          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Price below"
            className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />


          {/* CLEAR */}

          <button
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm hover:bg-slate-50"
          >

            <X size={16} />

            Clear

          </button>


          {/* REFRESH */}

          <button
            onClick={refreshProducts}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm hover:bg-slate-50"
          >

            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh

          </button>

        </div>

      </div>


      {/* ==========================================
          PRODUCT TABLE
      ========================================== */}

      <div className="rounded-xl bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

          <div>

            <h2 className="font-semibold text-slate-800">
              Product List
            </h2>

            <p className="text-xs text-slate-400">
              {total} total products
            </p>

          </div>


          <div className="text-sm text-slate-500">

            Page {page || currentPage}{" "}
            of{" "}
            {totalPages || 1}

          </div>

        </div>


        {loading ? (

          <div className="flex min-h-72 items-center justify-center">

            <div className="text-sm text-slate-500">
              Loading products...
            </div>

          </div>

        ) : (

          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={setDeleteTarget}
          />

        )}


        {/* ========================================
            PAGINATION
        ======================================== */}

        {total > 0 && (

          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">

            <p className="text-sm text-slate-500">

              Showing{" "}
              {products.length}{" "}
              products

            </p>


            <div className="flex items-center gap-2">

              <button
                disabled={
                  currentPage <= 1
                }
                onClick={previousPage}
                className="rounded-lg border border-slate-300 p-2 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <ChevronLeft size={18} />

              </button>


              <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">

                {currentPage}

              </span>


              <button
                disabled={
                  currentPage >=
                  totalPages
                }
                onClick={nextPage}
                className="rounded-lg border border-slate-300 p-2 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <ChevronRight size={18} />

              </button>

            </div>

          </div>

        )}

      </div>


      {/* ==========================================
          EDIT MODAL
      ========================================== */}

      {editProduct && (

        <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/50 p-4">

          <div className="mx-auto my-8 max-w-5xl rounded-2xl bg-white shadow-2xl">

            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">

              <div>

                <h2 className="text-xl font-bold">
                  Edit Product
                </h2>

                <p className="text-sm text-slate-500">
                  Update product details or replace the image.
                </p>

              </div>


              <button
                onClick={() =>
                  setEditProduct(null)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >

                <X size={20} />

              </button>

            </div>


            <div className="p-6">

              <ProductForm
                initialData={editProduct}
                onSubmit={handleUpdate}
                loading={actionLoading}
              />

            </div>

          </div>

        </div>

      )}


      {/* ==========================================
          DELETE MODAL
      ========================================== */}

      <ConfirmModal
        product={deleteTarget}
        loading={actionLoading}
        onCancel={() =>
          setDeleteTarget(null)
        }
        onConfirm={handleDelete}
      />

    </div>

  );
}

export default Products;