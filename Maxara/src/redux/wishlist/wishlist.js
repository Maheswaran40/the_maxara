import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_LIKE_API;

// ===============================
// ADD WISHLIST
// ===============================

export const addLikeData = createAsyncThunk(
  "wishlist/addLikeData",

  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/`,
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );

      console.log("ADD LIKE RESPONSE:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to add wishlist"
      );
    }
  }
);

// ===============================
// GET WISHLIST
// ===============================

export const getLike = createAsyncThunk(
  "wishlist/getLike",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/`,
        {
          withCredentials: true,
        }
      );

      console.log("GET LIKE RESPONSE:", response.data.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch wishlist"
      );
    }
  }
);

// ===============================
// DELETE WISHLIST
// ===============================

export const deleteLike = createAsyncThunk(
  "wishlist/deleteLike",

  async (wishlistId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/delete/${wishlistId}`,
        {
          withCredentials: true,
        }
      );

      console.log("DELETE LIKE RESPONSE:", response.data);

      return {
        wishlistId,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete wishlist"
      );
    }
  }
);

// ===============================
// SLICE
// ===============================

export const likeStore = createSlice({
  name: "wishlist",

  initialState: {
    likeItem: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    // ===============================
    // ADD WISHLIST
    // ===============================

    builder
      .addCase(addLikeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addLikeData.fulfilled, (state, action) => {
        state.loading = false;

        console.log(
          "ADD LIKE FULFILLED:",
          action.payload
        );

      })

      .addCase(addLikeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===============================
    // GET WISHLIST
    // ===============================

    builder
      .addCase(getLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLike.fulfilled, (state, action) => {
        state.loading = false;

        console.log(
          "GET LIKE FULFILLED:",
          action.payload
        );


        const wishlistData =
          action.payload?.data || [];

        state.likeItem = wishlistData.filter(Boolean);

        console.log(
          "CLEAN WISHLIST:",
          state.likeItem
        );
      })

      .addCase(getLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ===============================
    // DELETE WISHLIST
    // ===============================

    builder
      .addCase(deleteLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteLike.fulfilled, (state, action) => {
        state.loading = false;

        state.likeItem = state.likeItem.filter(
          (item) =>
            item &&
            item._id !== action.payload.wishlistId
        );
      })

      .addCase(deleteLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default likeStore.reducer;