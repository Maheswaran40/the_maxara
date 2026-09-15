import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storageModule from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import wishReducer from "./wishlist/wishlist";

const storage = storageModule.default;

// Cart persist config
const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);

// Wishlist persist config
const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishReducer
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
  },
});

export const persistor = persistStore(store);