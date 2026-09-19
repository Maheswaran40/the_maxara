import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_CART_API;


// ===============================
// ADD CART
// ===============================

export const addCart = createAsyncThunk(
  "cart/addCart",
  async ({ product, quantity }, { rejectWithValue }) => {
    try {

      console.log("PRODUCT RECEIVED:", product);
      console.log("PRODUCT ID:", product?._id);

      const response = await axios.post(
        `${API_URL}/`,
        {
          productId: product?._id,
          quantity,
        },
        {
          withCredentials: true,
        }
      );

      console.log("CART RESPONSE:", response.data);

      return response.data;

    } catch (error) {

      console.log("ADD CART ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || "Failed to add cart"
      );
    }
  }
);


// ===============================
// GET CART
// ===============================

export const getCart = createAsyncThunk(

  "cart/getCart",

  async (_, { rejectWithValue }) => {

    try {

      const response = await axios.get(

        `${API_URL}/`,

        {
          withCredentials: true,
        }

      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch cart"
      );

    }

  }

);


// ===============================
// DELETE CART
// ===============================

export const deleteCart = createAsyncThunk(

  "cart/deleteCart",

  async (cartId, { rejectWithValue }) => {

    try {

      const response = await axios.delete(

        `${API_URL}/delete/${cartId}`,

        {
          withCredentials: true,
        }

      );

      return {

        cartId,

        message: response.data.message,

      };

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to delete product"
      );

    }

  }

);


// ===============================
// update CART
// ===============================


export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/update/${cartId}`,
        { quantity },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Failed to update quantity"
      );
    }
  }
);


// ===============================
// CART SLICE
// ===============================

const cartSlice = createSlice({

  name: "cart",

  initialState: {

    cartItems: [],

    loading: false,

    error: null,
    loaded: false,

  },


  reducers: {},


extraReducers: (builder) => {
  builder
    .addCase(getCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload.data || [];
      state.loaded = true;
    })

    .addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(addCart.pending, (state) => {
      state.loading = true;
    })

    .addCase(addCart.fulfilled, (state, action) => {
      state.loading = false;

      const cart = action.payload.cart;
      const product = action.payload.product;

      state.cartItems.push({
        ...cart,
        product: product,
      });
    })

    .addCase(addCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // UPDATE QUANTITY
    .addCase(updateCart.fulfilled, (state, action) => {
      const updatedCart = action.payload.data;

      const index = state.cartItems.findIndex(
        (item) => item._id === updatedCart._id
      );

      if (index !== -1) {
        state.cartItems[index].quantity = updatedCart.quantity;
      }
    })

    // DELETE
    .addCase(deleteCart.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload.cartId
      );
    })

    .addCase(deleteCart.rejected, (state, action) => {
      state.error = action.payload;
    });
},

});


export default cartSlice.reducer;