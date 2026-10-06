import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getProducts,
  updateProduct,
} from "../redux/product/productSlice";

import ProductForm from "../components/ProductForm";


function EditProduct() {

  const {
    id
  } = useParams();


  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();


  const {
    products,
    actionLoading,
  } = useSelector(
    (state) => state.product
  );


  const [product, setProduct] =
    useState(null);


  useEffect(() => {

    const existing =
      products.find(
        (item) =>
          item._id === id
      );


    if (existing) {

      setProduct(existing);

      return;

    }


    async function loadProduct() {

      const result =
        await dispatch(
          getProducts({
            page: 1,
            limit: 100,
            search: "",
          })
        );


      if (
        getProducts.fulfilled.match(
          result
        )
      ) {

        const found =
          result.payload.products.find(
            (item) =>
              item._id === id
          );

        setProduct(found);

      }

    }


    loadProduct();

  }, [
    id,
    products,
    dispatch,
  ]);


  async function handleUpdate(
    formData
  ) {

    try {

      await dispatch(
        updateProduct({
          id,
          formData,
        })
      ).unwrap();


      navigate("/products");

    } catch (error) {

      alert(
        typeof error === "string"
          ? error
          : "Product update failed"
      );

    }

  }


  if (!product) {

    return (

      <div className="rounded-xl bg-white p-10 text-center">

        Loading product...

      </div>

    );

  }


  return (

    <div className="mx-auto max-w-5xl">

      <div className="mb-6">

        <h1 className="text-2xl font-bold">
          Edit Product
        </h1>

        <p className="text-sm text-slate-500">
          Update product information.
        </p>

      </div>


      <div className="rounded-xl bg-white p-6 shadow-sm">

        <ProductForm
          initialData={product}
          onSubmit={handleUpdate}
          loading={actionLoading}
        />

      </div>

    </div>

  );

}


export default EditProduct;