// src/redux/categorySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// دریافت دسته‌بندی‌ها از API
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => {
        const response = await axios.get("https://dummyjson.com/products/category-list");
        return response.data;
    }
);

const initialState = {
    categories: JSON.parse(localStorage.getItem("categories")) || [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;

                // ذخیره در localStorage
                localStorage.setItem("categories", JSON.stringify(action.payload));
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
