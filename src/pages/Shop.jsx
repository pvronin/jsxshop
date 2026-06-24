import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// ایمپورت کامپوننت‌ها
import ShopHeader from "../components/shop/ShopHeader";
import ProductCard from "../components/shop/ProductCard";
import ShopPagination from "../components/shop/ShopPagination";
import ShopSidebar from "../components/shop/ShopSidebar";
import MobileSidebarWrapper from "../components/shop/MobileSidebarWrapper"; // ← ایمپورت جدید
import LoadingSpinner from "../components/LoadingSpinner";
import { productApi } from "../services/productApi";
import ProductGrid from "../components/shop/ProductGrid";

export default function Shop() {
    const [currentpage, setCurrentpage] = useState(1);
    const [limitproduct] = useState(12);
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);

    const location = useLocation();
    const path = location.pathname.replace("/shop", "").split("/").filter(Boolean);

    // State فیلترها و مرتب‌سازی
    const [filters, setFilters] = useState({
        category: "",
        minPrice: "",
        maxPrice: "",
        rating: 0,
        stock: "all",
    });
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        const mainCategory = path.at(-1) || "";
        setFilters(prev => ({ ...prev, category: mainCategory }));
        setCurrentpage(1);
    }, [location.pathname]);

    // داخل کامپوننت Shop
    const buildQueryParams = () => {
        const params = { limit: 200 }; // حتماً limit رو بذار تا همه محصولات بیاد

        if (sortBy === "price-asc") {
            params.sortBy = "price";
            params.order = "asc";
        } else if (sortBy === "price-desc") {
            params.sortBy = "price";
            params.order = "desc";
        } else if (sortBy === "rating-desc") {
            params.sortBy = "rating";
            params.order = "desc";
        } else if (sortBy === "discount-desc") {
            params.sortBy = "discountPercentage";
            params.order = "desc";
        }

        return params;
    };

    const fetchProducts = async () => {
        const params = buildQueryParams(); // الان یک آبجکت است


        let response;
        if (filters.category) {
            response = await productApi.getByCategory(filters.category, params);
        } else {
            response = await productApi.getAll(params);
        }

        // چون apiClient ما یک آبجکت با کلید data برمی‌گرداند
        return response.data; // ← این شامل { products: [...], total: ... } است
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["products", filters, sortBy],
        queryFn: fetchProducts,
        select: (result) => {
            let filtered = result.products || [];
            if (filters.minPrice) filtered = filtered.filter((p) => p.price >= parseInt(filters.minPrice));
            if (filters.maxPrice) filtered = filtered.filter((p) => p.price <= parseInt(filters.maxPrice));
            if (filters.rating > 0) filtered = filtered.filter((p) => p.rating >= filters.rating);
            if (filters.stock === "inStock") filtered = filtered.filter((p) => p.stock > 0);
            else if (filters.stock === "outOfStock") filtered = filtered.filter((p) => p.stock === 0);

            if (sortBy === "rating-desc") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
            if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
            if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
            if (sortBy === "discount-desc") filtered = [...filtered].sort((a, b) => b.discountPercentage - a.discountPercentage);

            return filtered;
        },
    });

    const countpagination = Math.ceil((data?.length || 0) / limitproduct);
    const startIndex = (currentpage - 1) * limitproduct;
    const currentProducts = data?.slice(startIndex, startIndex + limitproduct) || [];

    const handlePageChange = (page) => {
        setCurrentpage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentpage(1);
    };

    const updateSort = (newSort) => {
        setSortBy(newSort);
        setCurrentpage(1);
    };

    const clearFilters = () => {
        setFilters({ category: "", minPrice: "", maxPrice: "", brand: "", rating: 0, stock: "all" });
        setSortBy("");
        setCurrentpage(1);
    };

    if (error) return <div className="flex justify-center items-center h-64 text-red-500">خطا: {error.message}</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-10 ">
            {/* سایدبار موبایل با Wrapper جدید */}
            <MobileSidebarWrapper
                isOpen={showSidebarMobile}
                onClose={() => setShowSidebarMobile(false)}
            >
                <ShopSidebar
                    filters={filters}
                    updateFilter={updateFilter}
                    clearFilters={clearFilters}
                    topSpace={2}
                />
            </MobileSidebarWrapper>

            <div className="container mx-auto px-4">


                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* سایدبار دسکتاپ */}
                    <div className="hidden lg:block sticky top-18 lg:w-1/4">
                        <ShopSidebar
                            filters={filters}
                            updateFilter={updateFilter}
                            clearFilters={clearFilters}
                        />
                    </div>

                    {/* لیست محصولات */}
                    <div className="w-full lg:w-3/4">
                        <ShopHeader
                            totalProducts={data ? data.length : 0}
                            shownCount={Math.min(limitproduct, currentProducts.length)}
                            sortBy={sortBy}
                            updateSort={updateSort}
                            onMenuClick={() => setShowSidebarMobile(!showSidebarMobile)}
                            showSidebarMobile={showSidebarMobile}
                        />

                        {isLoading ? <LoadingSpinner /> : <ProductGrid products={currentProducts} />}

                        <ShopPagination
                            currentPage={currentpage}
                            totalPages={countpagination}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
