import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { saveCartToLocalStorage } from './slices/Cartslice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartToLocalStorage),
});
