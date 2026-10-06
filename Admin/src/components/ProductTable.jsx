import {
  Edit,
  Trash2,
  PackageOpen,
} from "lucide-react";


function ProductTable({
  products,
  onEdit,
  onDelete,
}) {

  if (!products.length) {

    return (

      <div className="flex min-h-64 flex-col items-center justify-center text-slate-400">

        <PackageOpen size={45} />

        <p className="mt-3">
          No products found
        </p>

      </div>

    );

  }


  return (

    <div className="overflow-x-auto">

      <table className="w-full min-w-[900px]">

        <thead>

          <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">

            <th className="px-4 py-4">
              Image
            </th>

            <th className="px-4 py-4">
              Product
            </th>

            <th className="px-4 py-4">
              Category
            </th>

            <th className="px-4 py-4">
              Folder
            </th>

            <th className="px-4 py-4">
              Price
            </th>

            <th className="px-4 py-4">
              ID
            </th>

            <th className="px-4 py-4 text-right">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {products.map((product) => (

            <tr
              key={product._id}
              className="border-b border-slate-100 hover:bg-slate-50"
            >

              {/* IMAGE */}

              <td className="px-4 py-4">

                {product.url ? (

                  <img
                    src={product.url}
                    alt={product.name}
                    className="h-14 w-14 rounded-lg border border-slate-200 object-cover"
                  />

                ) : (

                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                    No image
                  </div>

                )}

              </td>


              {/* NAME */}

              <td className="px-4 py-4">

                <div>

                  <p className="font-medium text-slate-800">
                    {product.name}
                  </p>

                  <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                    {product.desc || "No description"}
                  </p>

                </div>

              </td>


              {/* CATEGORY */}

              <td className="px-4 py-4">

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                  {product.category || "-"}
                </span>

              </td>


              {/* FOLDER */}

              <td className="px-4 py-4 text-sm text-slate-600">
                {product.folder || "-"}
              </td>


              {/* PRICE */}

              <td className="px-4 py-4 font-semibold text-slate-800">
                ₹{Number(product.price || 0).toLocaleString()}
              </td>


              {/* ID */}

              <td className="px-4 py-4">

                <span
                  title={product._id}
                  className="inline-block max-w-[110px] truncate text-xs text-slate-400"
                >
                  {product._id}
                </span>

              </td>


              {/* ACTION */}

              <td className="px-4 py-4">

                <div className="flex justify-end gap-2">

                  <button
                    onClick={() =>
                      onEdit(product)
                    }
                    className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                    title="Edit product"
                  >
                    <Edit size={17} />
                  </button>


                  <button
                    onClick={() =>
                      onDelete(product)
                    }
                    className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    title="Delete product"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ProductTable;