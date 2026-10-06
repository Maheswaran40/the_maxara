import { useState } from "react";

import {
  X,
  Upload,
  Save,
} from "lucide-react";


function ProductModal({
  product,
  onClose,
  onSubmit,
  loading = false,
}) {

  const [name, setName] =
    useState(product?.name || "");

  const [price, setPrice] =
    useState(product?.price || "");

  const [category, setCategory] =
    useState(product?.category || "");

  const [folder, setFolder] =
    useState(product?.folder || "");

  const [desc, setDesc] =
    useState(product?.desc || "");

  const [image, setImage] =
    useState(null);


  function handleSubmit(e) {

    e.preventDefault();

    const formData =
      new FormData();

    formData.append(
      "name",
      name
    );

    formData.append(
      "price",
      price
    );

    formData.append(
      "category",
      category
    );

    formData.append(
      "folder",
      folder
    );

    formData.append(
      "desc",
      desc
    );


    if (image) {

      formData.append(
        "image",
        image
      );

    }


    onSubmit(
      product._id,
      formData
    );

  }


  if (!product) {
    return null;
  }


  return (

    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/50
        p-4
      "
    >

      <div
        className="
          max-h-[90vh]
          w-full max-w-2xl
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            sticky top-0 z-10
            flex items-center
            justify-between
            border-b
            bg-white
            px-6 py-4
          "
        >

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Edit Product
            </h2>

            <p className="text-sm text-slate-500">
              Update product information
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-slate-500
              hover:bg-slate-100
              hover:text-red-500
            "
          >

            <X size={20} />

          </button>

        </div>


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* CURRENT IMAGE */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Current Image
            </label>


            {product.url ? (

              <img
                src={product.url}
                alt={product.name}
                className="
                  h-32 w-32
                  rounded-xl
                  border
                  object-cover
                "
              />

            ) : (

              <div
                className="
                  flex h-32 w-32
                  items-center justify-center
                  rounded-xl
                  bg-slate-100
                  text-xs text-slate-400
                "
              >
                No Image
              </div>

            )}

          </div>


          {/* NEW IMAGE */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Replace Image
            </label>

            <label
              className="
                flex cursor-pointer
                items-center gap-3
                rounded-xl
                border-2 border-dashed
                border-slate-300
                p-4
                hover:border-blue-500
              "
            >

              <Upload size={20} />

              <span className="text-sm text-slate-500">

                {image
                  ? image.name
                  : "Choose new image"}

              </span>


              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] ||
                    null
                  )
                }
              />

            </label>

          </div>


          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="
                w-full rounded-lg
                border border-slate-300
                px-4 py-3
                outline-none
                focus:border-blue-500
              "
            />

          </div>


          {/* PRICE */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              required
              className="
                w-full rounded-lg
                border border-slate-300
                px-4 py-3
                outline-none
                focus:border-blue-500
              "
            />

          </div>


          {/* CATEGORY */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <input
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="
                w-full rounded-lg
                border border-slate-300
                px-4 py-3
                outline-none
                focus:border-blue-500
              "
            />

          </div>


          {/* FOLDER */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Cloudinary Folder
            </label>

            <input
              value={folder}
              onChange={(e) =>
                setFolder(e.target.value)
              }
              className="
                w-full rounded-lg
                border border-slate-300
                px-4 py-3
                outline-none
                focus:border-blue-500
              "
            />

          </div>


          {/* DESCRIPTION */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={desc}
              onChange={(e) =>
                setDesc(e.target.value)
              }
              rows={5}
              className="
                w-full resize-none
                rounded-lg
                border border-slate-300
                px-4 py-3
                outline-none
                focus:border-blue-500
              "
            />

          </div>


          {/* BUTTONS */}

          <div
            className="
              flex justify-end gap-3
              border-t pt-5
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border border-slate-300
                px-5 py-3
                text-sm font-medium
                hover:bg-slate-100
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="
                flex items-center gap-2
                rounded-lg
                bg-blue-600
                px-5 py-3
                text-sm font-medium
                text-white
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              <Save size={17} />

              {loading
                ? "Updating..."
                : "Update Product"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}


export default ProductModal;