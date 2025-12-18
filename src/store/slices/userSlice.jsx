// store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ✅ بازیابی کاربر از localStorage موقع لود اولیه
const getUserFromLocalStorage = () => {
    try {
        const userData = localStorage.getItem("user");
        return userData ? JSON.parse(userData) : null;
    } catch {
        return null;
    }
};

const initialState = {
    user: getUserFromLocalStorage(), // ✅ بازیابی از localStorage
    isAuthenticated: !! localStorage.getItem("token") // ✅ چک کردن توکن
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            // ✅ ذخیره در localStorage
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        // ✅ اکشن جدید برای بازیابی از localStorage
        loadUserFromStorage: (state) => {
            const userData = getUserFromLocalStorage();
            state.user = userData;
            state.isAuthenticated = !!localStorage.getItem("token");
        }
    }
});

export const { setUser, logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
