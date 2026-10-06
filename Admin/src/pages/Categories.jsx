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
  Folder,
  Package,
  RefreshCw,
} from "lucide-react";


function Categories() {

  const dispatch =
    useDispatch();


  const {
    products,
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


  const categories =
    useMemo(() => {

      const categoryMap =
        {};


      products.forEach(
        (product) => {

          const category =
            product.category?.trim();


          if (!category) {
            return;
          }


          if (
            !categoryMap[category]
          ) {

            categoryMap[category] = {
              name: category,
              count: 0,
            };

          }


          categoryMap[category].count++;

        }
      );


      return Object.values(
        categoryMap
      );

    }, [products]);


  return (

    <div>

      {/* HEADER */}

      <div
        className="
          mb-6
          flex flex-col
          justify-between
          gap-4
          md:flex-row
          md:items-center
        "
      >

        <div>

          <h1 className="text-2xl font-bold">
            Categories
          </h1>

          <p className="text-sm text-slate-500">
            Product categories generated from your products.
          </p>

        </div>


        <button
          onClick={() =>
            dispatch(
              getProducts({
                page: 1,
                limit: 1000,
              })
            )
          }
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


      {/* LOADING */}

      {loading && (

        <div className="rounded-xl bg-white p-10 text-center">

          Loading categories...

        </div>

      )}


      {/* EMPTY */}

      {!loading &&
        categories.length === 0 && (

          <div
            className="
              rounded-xl
              bg-white
              p-12
              text-center
            "
          >

            <Folder
              size={45}
              className="mx-auto mb-4 text-slate-300"
            />

            <h2 className="font-semibold">
              No categories found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add products with a category to see them here.
            </p>

          </div>

        )}


      {/* CATEGORY CARDS */}

      {!loading &&
        categories.length > 0 && (

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

            {categories.map(
              (category) => (

                <div
                  key={category.name}
                  className="
                    rounded-xl
                    border
                    bg-white
                    p-5
                    shadow-sm
                    transition
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >

                  <div className="flex items-start justify-between">

                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-xl
                        bg-blue-50
                        text-blue-600
                      "
                    >

                      <Folder size={22} />

                    </div>


                    <span
                      className="
                        rounded-full
                        bg-slate-100
                        px-3 py-1
                        text-xs
                        text-slate-600
                      "
                    >
                      {category.count} products
                    </span>

                  </div>


                  <h2
                    className="
                      mt-5
                      font-semibold
                      capitalize
                    "
                  >
                    {category.name}
                  </h2>


                  <p className="mt-1 text-xs text-slate-500">
                    Product category
                  </p>

                </div>

              )
            )}

          </div>

        )}

    </div>

  );

}


export default Categories;