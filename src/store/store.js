import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { saveCartToLocalStorage } from './slices/Cartslice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartToLocalStorage),
});
