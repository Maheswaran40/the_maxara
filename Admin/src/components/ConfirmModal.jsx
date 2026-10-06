import {
  AlertTriangle,
  X,
} from "lucide-react";


function ConfirmModal({
  product,
  loading,
  onCancel,
  onConfirm,
}) {

  if (!product) return null;


  return (

    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">


        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-red-100 p-3 text-red-600">

              <AlertTriangle size={22} />

            </div>

            <div>

              <h2 className="font-semibold text-slate-900">
                Delete Product
              </h2>

              <p className="text-sm text-slate-500">
                This action cannot be undone.
              </p>

            </div>

          </div>


          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={20} />
          </button>

        </div>


        <div className="mt-5 rounded-lg bg-slate-50 p-4">

          <p className="font-medium text-slate-800">
            {product.name}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            ₹{Number(product.price || 0).toLocaleString()}
          </p>

        </div>


        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium"
          >
            Cancel
          </button>


          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >

            {loading
              ? "Deleting..."
              : "Delete"}

          </button>

        </div>

      </div>

    </div>

  );
}

export default ConfirmModal;