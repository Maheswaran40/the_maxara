import {
  useEffect,
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getProducts,
} from "../redux/product/productSlice";

import {
  Package,
  Image,
  Folder,
  IndianRupee,
  RefreshCw,
} from "lucide-react";


function Inventory() {

  const dispatch =
    useDispatch();


  const {
    products,
    total,
    loading,
  } = useSelector(
    (state) => state.product
  );


  useEffect(() => {

    dispatch(
      getProducts({
        page: 1,
        limit: 1000,
      })
    );

  }, [dispatch]);


  const stats =
    useMemo(() => {

      const totalValue =
        products.reduce(
          (sum, product) =>
            sum +
            Number(product.price || 0),
          0
        );


      const withImage =
        products.filter(
          (product) =>
            product.url
        ).length;


      const withoutImage =
        products.filter(
          (product) =>
            !product.url
        ).length;


      const folders =
        new Set(
          products
            .map(
              (product) =>
                product.folder
            )
            .filter(Boolean)
        ).size;


      return {
        totalValue,
        withImage,
        withoutImage,
        folders,
      };

    }, [products]);


  function refresh() {

    dispatch(
      getProducts({
        page: 1,
        limit: 1000,
      })
    );

  }


  return (

    <div>

      {/* HEADER */}

      <div
        className="
          mb-6
          flex flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>

          <h1 className="text-2xl font-bold">
            Inventory
          </h1>

          <p className="text-sm text-slate-500">
            Manage and monitor your product inventory.
          </p>

        </div>


        <button
          onClick={refresh}
          className="
            flex items-center gap-2
            rounded-lg
            border
            bg-white
            px-4 py-2
            text-sm
            hover:bg-slate-50
          "
        >

          <RefreshCw size={16} />

          Refresh

        </button>

      </div>


      {/* STATS */}

      <div
        className="
          mb-6
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        <InventoryStat
          icon={Package}
          title="Total Products"
          value={total}
        />


        <InventoryStat
          icon={IndianRupee}
          title="Total Product Value"
          value={`₹${stats.totalValue.toLocaleString("en-IN")}`}
        />


        <InventoryStat
          icon={Image}
          title="Products With Image"
          value={stats.withImage}
        />


        <InventoryStat
          icon={Folder}
          title="Cloudinary Folders"
          value={stats.folders}
        />

      </div>


      {/* PRODUCT TABLE */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          bg-white
          shadow-sm
        "
      >

        <div className="border-b p-5">

          <h2 className="font-semibold">
            Product Inventory
          </h2>

        </div>


        {loading ? (

          <div className="p-10 text-center text-sm text-slate-500">

            Loading inventory...

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-5 py-4">
                    Product
                  </th>

                  <th className="px-5 py-4">
                    Category
                  </th>

                  <th className="px-5 py-4">
                    Folder
                  </th>

                  <th className="px-5 py-4">
                    Price
                  </th>

                  <th className="px-5 py-4">
                    Image
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y">

                {products.map(
                  (product) => (

                    <tr
                      key={product._id}
                      className="hover:bg-slate-50"
                    >

                      {/* PRODUCT */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          {product.url ? (

                            <img
                              src={product.url}
                              alt={product.name}
                              className="
                                h-12 w-12
                                rounded-lg
                                object-cover
                              "
                            />

                          ) : (

                            <div
                              className="
                                flex h-12 w-12
                                items-center justify-center
                                rounded-lg
                                bg-slate-100
                              "
                            >

                              <Image
                                size={18}
                                className="text-slate-400"
                              />

                            </div>

                          )}


                          <div>

                            <p className="font-medium">
                              {product.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {product._id}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* CATEGORY */}

                      <td className="px-5 py-4">

                        <span
                          className="
                            rounded-full
                            bg-blue-50
                            px-3 py-1
                            text-xs
                            text-blue-600
                          "
                        >

                          {product.category ||
                            "Uncategorized"}

                        </span>

                      </td>


                      {/* FOLDER */}

                      <td className="px-5 py-4 text-slate-600">

                        {product.folder ||
                          "maxara"}

                      </td>


                      {/* PRICE */}

                      <td className="px-5 py-4 font-semibold">

                        ₹
                        {Number(
                          product.price || 0
                        ).toLocaleString("en-IN")}

                      </td>


                      {/* IMAGE */}

                      <td className="px-5 py-4">

                        {product.url ? (

                          <span className="text-green-600">
                            Available
                          </span>

                        ) : (

                          <span className="text-red-500">
                            Missing
                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* NOTE */}

      <div
        className="
          mt-5
          rounded-xl
          border border-amber-200
          bg-amber-50
          p-4
          text-sm
          text-amber-800
        "
      >

        <strong>Inventory note:</strong>{" "}

        Your current MongoDB product schema does not contain
        a stock/quantity field. This page therefore shows
        the actual products, prices, categories and images
        currently available in MongoDB. To manage stock
        quantities, add a <code>stock</code> field to the
        product model and controller.

      </div>

    </div>

  );

}


/* =========================================
   STAT COMPONENT
========================================= */

function InventoryStat({
  icon: Icon,
  title,
  value,
}) {

  return (

    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
        shadow-sm
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {value}
          </p>

        </div>


        <div
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          "
        >

          <Icon size={21} />

        </div>

      </div>

    </div>

  );

}


export default Inventory;