import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";


// ===============================
// GET PRODUCTS
// ===============================

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (
    {
      id = "",
      folder = "",
      search = "",
      price = "",
      limit = 10,
      page = 1,
    } = {},
    { rejectWithValue }
  ) => {
    try {

      const response = await axios.get(
        `${API_URL}/api/getProduct`,
        {
          params: {
            id,
            folder,
            search,
            price,
            limit,
            page,
          },
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );

    }
  }
);


// ===============================
// ADD PRODUCT
// ===============================

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData, { rejectWithValue }) => {
    console.log("API_URL =", API_URL);
    try {

      const response = await axios.post(
        `${API_URL}/api/addProduct`,
        formData
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );

    }

  }
);


// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { id, formData },
    { rejectWithValue }
  ) => {

    try {

      const response = await axios.put(
        `${API_URL}/api/updateProduct/${id}`,
        formData
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );

    }

  }
);


// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (
    id,
    { rejectWithValue }
  ) => {

    try {

      const response = await axios.delete(
        `${API_URL}/api/deleteProduct/${id}`
      );

      return {
        id,
        ...response.data,
      };

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        error.message
      );

    }

  }
);


// ===============================
// SLICE
// ===============================

const productSlice = createSlice({

  name: "product",

  initialState: {

    products: [],

    total: 0,

    page: 1,

    loading: false,

    error: null,

    success: false,

  },


  reducers: {

    clearProductError: (state) => {

      state.error = null;

    },

    clearProductSuccess: (state) => {

      state.success = false;

    },

  },


  extraReducers: (builder) => {

    // =========================
    // GET
    // =========================

    builder

      .addCase(
        getProducts.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        getProducts.fulfilled,
        (state, action) => {

          state.loading = false;

          state.products =
            action.payload.products || [];

          state.total =
            action.payload.total || 0;

          state.page =
            action.payload.page || 1;

        }
      )

      .addCase(
        getProducts.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to fetch products";

        }
      );


    // =========================
    // ADD
    // =========================

    builder

      .addCase(
        addProduct.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        addProduct.fulfilled,
        (state) => {

          state.loading = false;

          state.success = true;

        }
      )

      .addCase(
        addProduct.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to add product";

        }
      );


    // =========================
    // UPDATE
    // =========================

    builder

      .addCase(
        updateProduct.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        updateProduct.fulfilled,
        (state, action) => {

          state.loading = false;

          state.success = true;


          const updatedProduct =
            action.payload;


          const index =
            state.products.findIndex(
              (product) =>
                product._id ===
                updatedProduct._id
            );


          if (index !== -1) {

            state.products[index] =
              updatedProduct;

          }

        }
      )

      .addCase(
        updateProduct.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to update product";

        }
      );


    // =========================
    // DELETE
    // =========================

    builder

      .addCase(
        deleteProduct.pending,
        (state) => {

          state.loading = true;

          state.error = null;

        }
      )

      .addCase(
        deleteProduct.fulfilled,
        (state, action) => {

          state.loading = false;

          state.success = true;


          state.products =
            state.products.filter(
              (product) =>
                product._id !==
                action.payload.id
            );


          state.total =
            Math.max(
              0,
              state.total - 1
            );

        }
      )

      .addCase(
        deleteProduct.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload ||
            "Failed to delete product";

        }
      );

  },

});


export const {
  clearProductError,
  clearProductSuccess,
} = productSlice.actions;


export default productSlice.reducer;