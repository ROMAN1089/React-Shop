import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../entities/products/productsSlice';
import cartReducer from '../entities/cart/cartSlice';
import authReducer from "../features/auth/authSlice"
import searchReducer from "../entities/Search/SearcBarSlice.ts"


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;