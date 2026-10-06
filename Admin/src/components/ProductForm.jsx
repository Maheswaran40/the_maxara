import { useEffect, useState } from "react";

import { ImagePlus, X, Save, Loader2 } from "lucide-react";

function ProductForm({ initialData = null, onSubmit, loading = false }) {
  const [form, setForm] = useState({
    folder: "",
    filename: "",
    name: "",
    price: "",
    category: "",
    desc: "",
    url: "",
    dashprice: "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        folder: initialData.folder || "",
        filename: initialData.filename || "",
        name: initialData.name || "",
        price: initialData.price || "",
        category: initialData.category || "",
        desc: initialData.desc || "",
        url: initialData.url || "",
        dashprice: initialData.dashprice || "",
      });

      setPreview(initialData.url || "");
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const imageURL = URL.createObjectURL(file);

    setPreview(imageURL);
  }

  function removeImage() {
    setImage(null);

    setPreview(initialData?.url || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Product name is required");

      return;
    }

    if (!form.price) {
      alert("Product price is required");

      return;
    }

    if (!form.category.trim()) {
      alert("Category is required");

      return;
    }

    const formData = new FormData();

    formData.append("folder", form.folder);

    formData.append("filename", form.filename);

    formData.append("name", form.name);

    formData.append("price", form.price);

    formData.append("category", form.category);

    formData.append("desc", form.desc);

    formData.append("dashprice", form.dashprice);

    // New image only
    if (image) {
      formData.append("image", image);
    }

    // Existing URL when editing
    if (!image && form.url) {
      formData.append("url", form.url);
    }

    if (!form.folder.trim()) {
      alert("Cloudinary folder is required");
      return;
    }

    if (!form.desc.trim()) {
      alert("Description is required");
      return;
    }

    if (!form.dashprice) {
      alert("Original price is required");
      return;
    }

    await onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ======================================
          IMAGE
      ====================================== */}

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Product Image
        </label>

        <div className="relative flex min-h-56 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
          {preview ? (
            <>
              <img
                src={preview}
                alt="Product preview"
                className="h-56 w-full object-contain"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 rounded-full bg-red-500 p-2 text-white shadow"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <label className="flex cursor-pointer flex-col items-center gap-2 text-slate-500">
              <ImagePlus size={32} />

              <span className="text-sm">Click to upload product image</span>

              <span className="text-xs text-slate-400">JPG, PNG, WEBP</span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* ======================================
          PRODUCT INFORMATION
      ====================================== */}

      <div className="grid gap-5 md:grid-cols-2">
        {/* NAME */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name *
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* PRICE */}

        <div>
          <label className="mb-2 block text-sm font-medium">Price *</label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* dash price */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            dash Price *
          </label>

          <input
            type="number"
            name="dashprice"
            value={form.dashprice}
            onChange={handleChange}
            placeholder="Enter original price"
            min="0"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label className="mb-2 block text-sm font-medium">Category *</label>

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Example: shoes"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* FOLDER */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Cloudinary Folder
          </label>

          <input
            type="text"
            name="folder"
            value={form.folder}
            onChange={handleChange}
            placeholder="Example: products"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* FILENAME */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Filename</label>

          <input
            type="text"
            name="filename"
            value={form.filename}
            onChange={handleChange}
            placeholder="Optional when uploading a new image"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-xs text-slate-400">
            When a new image is uploaded, your backend replaces this with the
            Cloudinary public_id.
          </p>
        </div>

        {/* DESCRIPTION */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Description</label>

          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="5"
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* ======================================
          SUBMIT
      ====================================== */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />

              {initialData ? "Update Product" : "Add Product"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
