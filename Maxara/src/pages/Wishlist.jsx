import { useDispatch, useSelector } from "react-redux";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { deleteLike } from "@/redux/wishlist/wishlist";

function Wishlist() {
  const dispatch = useDispatch();

  const likeItem = useSelector(
    (state) => state.wishlist.likeItem
  );

  console.log("WISHLIST:", likeItem);

  const wishlist = likeItem.filter(
    (item) => item && item.product
  );

   const handleDelete = (wishlistId) => {
    console.log("DELETE WISHLIST ID:", wishlistId);

    dispatch(deleteLike(wishlistId));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">

      {/* ================= HEADER ================= */}

      <div className="mx-auto mb-10 max-w-7xl">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <Heart
              size={24}
              className="fill-red-500 text-red-500"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              My Wishlist
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </div>

        </div>

      </div>


      {/* ================= EMPTY WISHLIST ================= */}

      {wishlist.length === 0 ? (

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center rounded-3xl bg-white px-6 py-20 text-center shadow-sm">

          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">

            <Heart
              size={36}
              className="text-gray-400"
            />

          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Your wishlist is empty
          </h2>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            Save your favorite products here and come back
            whenever you're ready to shop.
          </p>

        </div>

      ) : (

        /* ================= PRODUCT GRID ================= */

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {wishlist.map((v) => {

            const product = v.product;

            return (

              <div
                key={v._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* ================= IMAGE ================= */}

                <div className="relative overflow-hidden bg-gray-100">

                  <img
                    src={product.url}
                    alt={product.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />


                  {/* OFFER BADGE */}

                  {product.offer && (

                    <div className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
                      {product.offer} OFF
                    </div>

                  )}


                  {/* HEART */}

                  <button
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white"
                  >

                    <Heart
                      size={19}
                      className="fill-red-500 text-red-500"
                    />

                  </button>

                </div>


                {/* ================= CONTENT ================= */}

                <div className="p-5">

                  <h2 className="line-clamp-1 text-lg font-semibold capitalize text-gray-900">
                    {product.name}
                  </h2>


                  {/* DESCRIPTION */}

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                    {product.desc}
                  </p>


                  {/* ================= PRICE ================= */}

                  <div className="mt-4 flex items-center gap-3">

                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>

                    {product.dashprice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.dashprice}
                      </span>
                    )}

                  </div>


                  {/* ================= ACTIONS ================= */}

                  <div className="mt-5 flex gap-3">

                    <button
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      <ShoppingBag size={17} />
                      Add to Cart
                    </button>


                    <button
                    onClick={() => handleDelete(v._id)}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                    >
                      
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default Wishlist;