import { configureStore } from '@reduxjs/toolkit'
import cartReducer, { saveCartToLocalStorage } from './slices/Cartslice'
import userReducer from './slices/userSlice'
import categoryReducer from './slices/CategorySlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    category: categoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartToLocalStorage),
});
