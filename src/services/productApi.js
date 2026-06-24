// src/services/productApi.js
import { apiClient } from './apiClient';

const buildQueryString = (params) => {
    const { limit, skip, select, sortBy, order } = params;
    const queryParams = new URLSearchParams();

    if (limit !== undefined) queryParams.append('limit', limit);
    if (skip !== undefined) queryParams.append('skip', skip);
    if (sortBy) queryParams.append('sortBy', sortBy);
    if (order) queryParams.append('order', order);

    // مدیریت select (هم آرایه و هم رشته)
    if (select && Array.isArray(select)) {
        queryParams.append('select', select.join(','));
    } else if (select && typeof select === 'string') {
        queryParams.append('select', select);
    }

    return queryParams.toString();
};

export const productApi = {
    // ۱. دریافت همه محصولات با پارامترهای اختیاری
    getAll: (params = {}) => {
        const queryString = buildQueryString(params);
        return apiClient.get(`/products${queryString ? `?${queryString}` : ''}`);
    },

    // ۲. دریافت محصولات بر اساس دسته‌بندی با پارامترهای اختیاری (✅ دقیقاً مشابه getAll)
    getByCategory: (category, params = {}) => {
        const queryString = buildQueryString(params);
        return apiClient.get(`/products/category/${category}${queryString ? `?${queryString}` : ''}`);
    },

    // ۳. دریافت یک محصول با آیدی
    getById: (id) => apiClient.get(`/products/${id}`),

    // ۴. جستجو در محصولات
    getBySearch: (query) => apiClient.get(`/products/search?q=${query}`),

    // ۵. دریافت لیست دسته‌بندی‌ها
    getCategoryList: () => apiClient.get(`/products/category-list`),
};
