// ./slices/Cartslice.js  (این فایل اصلی است که در store.js ایمپورت شده)

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // درست: increment و decrement
        increment(state, action) {
            const itemId = action.payload.id;
            const existingItem = state.cart.find((item) => item.id === itemId);
            if (action.payload.quantity) {
                if (existingItem) {
                    existingItem.qty += action.payload.quantity;
                } else {
                    state.cart.push({ ...action.payload, qty: action.payload.quantity });
                }

            } else {
                if (existingItem) {
                    existingItem.qty += 1;
                } else {
                    state.cart.push({ ...action.payload, qty: 1 });
                }
            }
         toast.success(`به سبد افزوده شد`, {
                    icon: '✅',
                });
        },
        decrement(state, action) {
            const itemId = action.payload.id;
            const existingItem = state.cart.find((item) => item.id === itemId);
            if (existingItem) {
                if (existingItem.qty > 1) {
                    existingItem.qty -= 1;
                } else {
                    state.cart = state.cart.filter((item) => item.id !== itemId);
                }
            }
        },
        removeitem(state, action) {
            const itemId = action.payload;
            state.cart = state.cart.filter((item) => item.id !== itemId);
        },
        clear(state) {
            state.cart = [];
        },
    },
});

// middleware برای ذخیره خودکار
export const saveCartToLocalStorage = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem("cart", JSON.stringify(state.cart.cart));
    return result;
};

// درست: increment, decrement
export const { increment, decrement, removeitem, clear } = cartSlice.actions;

export default cartSlice.reducer;
