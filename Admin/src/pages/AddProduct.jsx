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

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();


  const actionLoading =
    useSelector(
      (state) =>
        state.product.actionLoading
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
          : "Product adding failed"
      );

    }

  }


  return (

    <div className="mx-auto max-w-5xl">

      <div className="mb-6">

        <h1 className="text-2xl font-bold">
          Add Product
        </h1>

        <p className="text-sm text-slate-500">
          Add a new product to Maxara.
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