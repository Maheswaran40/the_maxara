import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_API = "http://localhost:5000/auth";


// ===============================
// CHECK AUTH
// ===============================

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${AUTH_API}/me`,
        {
          withCredentials: true,
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.error ||
        "Not authenticated"
      );

    }
  }
);


// ===============================
// LOGIN
// ===============================

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (
    { userEmail, userPassword },
    { rejectWithValue }
  ) => {

    try {

      const response = await axios.post(
        `${AUTH_API}/login`,

        {
          userEmail,
          userPassword,
        },

        {
          withCredentials: true,
        }
      );

      return response.data;

    } catch (error) {

      return rejectWithValue({
        message:
          error.response?.data?.error ||
          "Login failed",

        status:
          error.response?.status,
      });

    }
  }
);


// ===============================
// AUTH SLICE
// ===============================

const authSlice = createSlice({

  name: "auth",

  initialState: {

    user: null,

    isAuthenticated: false,

    loading: true,

    showLoginModal: false,

    error: null,
  },


  reducers: {

    // Open login popup
    openLoginModal: (state) => {

      state.showLoginModal = true;

    },


    // Close login popup
    closeLoginModal: (state) => {

      state.showLoginModal = false;

      state.error = null;

    },


    // Logout
    logout: (state) => {

      state.user = null;

      state.isAuthenticated = false;

    },

  },


  extraReducers: (builder) => {

    builder

      // ===============================
      // CHECK AUTH
      // ===============================

      .addCase(checkAuth.pending, (state) => {

        state.loading = true;

      })


      .addCase(checkAuth.fulfilled, (state, action) => {

        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;

      })


      .addCase(checkAuth.rejected, (state) => {

        state.loading = false;

        state.user = null;

        state.isAuthenticated = false;

      })


      // ===============================
      // LOGIN
      // ===============================

      .addCase(loginUser.pending, (state) => {

        state.loading = true;

        state.error = null;

      })


      .addCase(loginUser.fulfilled, (state, action) => {

        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;

        state.showLoginModal = false;

        state.error = null;

      })


      .addCase(loginUser.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      });

  },

});


export const {
  openLoginModal,
  closeLoginModal,
  logout,
} = authSlice.actions;


export default authSlice.reducer;