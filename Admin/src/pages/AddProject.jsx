import {
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addProduct,
  getProducts,
} from "../redux/product/productSlice";

import ProductForm from "../components/ProductForm";


function AddProduct() {

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();


  const {
    actionLoading,
  } = useSelector(
    (state) => state.products
  );


  async function handleSubmit(
    formData
  ) {

    try {

      await dispatch(
        addProduct(formData)
      ).unwrap();


      await dispatch(
        getProducts({
          page: 1,
          limit: 10,
        })
      );


      navigate("/products");

    } catch (error) {

      alert(
        typeof error === "string"
          ? error
          : "Failed to add product"
      );

    }

  }


  return (

    <div className="mx-auto max-w-5xl space-y-6">

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          Add Product
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new product and upload its image to Cloudinary.
        </p>

      </div>


      <div className="rounded-xl bg-white p-6 shadow-sm">

        <ProductForm
          onSubmit={handleSubmit}
          loading={actionLoading}
        />

      </div>

    </div>

  );
}

export default AddProduct;