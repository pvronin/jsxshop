import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../store/slices/Cartslice";
import { useLocation } from "react-router-dom";

export default function Shop() {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [currentpage, setCurrentpage] = useState(1);
    const [limitproduct] = useState(12); // حذف setLimitproduct اگر نیاز به تغییر ندارید

    const location = useLocation().pathname;

    // ✅ دریافت دسته‌بندی‌ها از DummyJSON
    useEffect(() => {
        axios
            .get("https://dummyjson.com/products/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, [location]);

    // State فیلترها و مرتب‌سازی
    const [filters, setFilters] = useState({
        category: "",
        minPrice: "",
        maxPrice: "",
        brand: "",
        rating: 0,
        stock: "all",
    });

    const [sortBy, setSortBy] = useState("");

    // ✅ ساخت query string برای DummyJSON
    const buildQueryParams = () => {
        const params = new URLSearchParams();
        params.append('limit', 200); // دریافت همه محصولات برای فیلتر سمت کلاینت

        if (sortBy === "price-asc") {
            params.append("sortBy", "price");
            params.append("order", "asc");
        } else if (sortBy === "price-desc") {
            params.append("sortBy", "price");
            params.append("order", "desc");
        } else if (sortBy === "rating-desc") {
            params.append("sort", "rating");
            params.append("order", "desc");
        }

        return params.toString();
    };

    const fetchProducts = async () => {
        const queryString = buildQueryParams();
        let url;

        if (filters.category) {
            url = `https://dummyjson.com/products/category/${filters.category}?${queryString}`;
        } else {
            url = `https://dummyjson.com/products?${queryString}`;
        }

        const { data } = await axios.get(url);
        return data;
    };

    // ✅ دریافت محصولات با useQuery
    const { data, isLoading, error } = useQuery({
        queryKey: ["products", filters, sortBy],
        queryFn: fetchProducts,
        select: (result) => {
            let filtered = result.products || [];

            // فیلتر قیمت (سمت کلاینت)
            if (filters.minPrice)
                filtered = filtered.filter((p) => p.price >= parseInt(filters.minPrice));
            if (filters.maxPrice)
                filtered = filtered.filter((p) => p.price <= parseInt(filters.maxPrice));

            // فیلتر امتیاز
            if (filters.rating > 0)
                filtered = filtered.filter((p) => p.rating >= filters.rating);

            // فیلتر موجودی
            if (filters.stock === "inStock")
                filtered = filtered.filter((p) => p.stock > 0);
            else if (filters.stock === "outOfStock")
                filtered = filtered.filter((p) => p.stock === 0);

            return filtered;
        },
    });

    // ✅ محاسبات Pagination
    const countpagination = Math.ceil((data?.length || 0) / limitproduct);
    const totalpage = Array.from({ length: countpagination }, (_, i) => i + 1);

    // ✅ محاسبه محصولات صفحه فعلی
    const startIndex = (currentpage - 1) * limitproduct;
    const endIndex = startIndex + limitproduct;
    const currentProducts = data?.slice(startIndex, endIndex) || [];

    // ✅ تغییر صفحه
    const handlePageChange = (page) => {
        setCurrentpage(page);
        //    اسکرول به بالای صفحه بخاطر تجربه کاربری بد حذف شد
        // window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const updateFilter = (key, value) =>
        setFilters((prev) => ({ ...prev, [key]: value }));

    const updateSort = (newSort) => {
        setSortBy(newSort);
        setCurrentpage(1); // بازگشت به صفحه اول هنگام مرتب‌سازی
    };

    const clearFilters = () => {
        setFilters({
            category: "",
            minPrice: "",
            maxPrice: "",
            brand: "",
            rating: 0,
            stock: "all",
        });
        setSortBy("");
        setCurrentpage(1); // بازگشت به صفحه اول
    };

    if (error)
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                خطا در دریافت محصولات: {error.message}
            </div>
        );



    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                {/* عنوان و توضیحات فروشگاه */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="text-emerald-600">🛍️ فروشگاه</span> محصولات ما
                    </h1>
                    <p className="text-xl text-gray-500">محصولات منتخب از DummyJSON API با بهترین کیفیت و قیمت</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* سایدبار فیلترها */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 sticky top-30">
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-800">تصفیه نتایج</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm font-semibold text-red-500 hover:text-red-700 transition duration-150"
                                >
                                    پاک کردن همه 🗑️
                                </button>
                            </div>

                            {/* دسته‌بندی */}
                            <div className="mb-8">
                                <label className="block text-base font-bold text-gray-700 mb-3">
                                    🏷️ دسته‌بندی
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => {
                                        updateFilter("category", e.target.value);
                                        setCurrentpage(1); // بازگشت به صفحه اول
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 cursor-pointer"
                                >
                                    <option value="">همه دسته‌ها</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat.slug}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* محدوده قیمت */}
                            <div className="mb-8">
                                <label className="block text-base font-bold text-gray-700 mb-3">
                                    💰 محدوده قیمت
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        min="0"
                                        type="number"
                                        placeholder="حداقل"
                                        value={filters.minPrice || ""}
                                        onChange={(e) => {
                                            updateFilter("minPrice", e.target.value);
                                            setCurrentpage(1);
                                        }}
                                        className="border border-gray-300 p-3 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                    <input
                                        min="0"
                                        type="number"
                                        placeholder="حداکثر"
                                        value={filters.maxPrice || ""}
                                        onChange={(e) => {
                                            updateFilter("maxPrice", e.target.value);
                                            setCurrentpage(1);
                                        }}
                                        className="border border-gray-300 p-3 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            </div>

                            {/* امتیاز */}
                            <div className="mb-8">
                                <label className="block text-base font-bold text-gray-700 mb-3">
                                    ⭐ حداقل امتیاز
                                </label>
                                <div className='space-y-2'>
                                    {[4, 3, 2, 1].map((r) => (
                                        <label key={r} className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={r}
                                                checked={filters.rating === r}
                                                onChange={() => {
                                                    updateFilter("rating", r);
                                                    setCurrentpage(1);
                                                }}
                                                className="form-radio text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span>{r}+ ستاره</span>
                                        </label>
                                    ))}
                                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={0}
                                            checked={filters.rating === 0}
                                            onChange={() => {
                                                updateFilter("rating", 0);
                                                setCurrentpage(1);
                                            }}
                                            className="form-radio text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span>همه</span>
                                    </label>
                                </div>
                            </div>

                            {/* وضعیت موجودی */}
                            <div>
                                <label className="block text-base font-bold text-gray-700 mb-3">
                                    📦 وضعیت موجودی
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                                        <input
                                            type="radio"
                                            name="stock"
                                            value="inStock"
                                            checked={filters.stock === "inStock"}
                                            onChange={(e) => {
                                                updateFilter("stock", e.target.value);
                                                setCurrentpage(1);
                                            }}
                                            className="form-radio text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span>موجود</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                                        <input
                                            type="radio"
                                            name="stock"
                                            value="outOfStock"
                                            checked={filters.stock === "outOfStock"}
                                            onChange={(e) => {
                                                updateFilter("stock", e.target.value);
                                                setCurrentpage(1);
                                            }}
                                            className="form-radio text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span>ناموجود</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition duration-150">
                                        <input
                                            type="radio"
                                            name="stock"
                                            value="all"
                                            checked={filters.stock === "all"}
                                            onChange={(e) => {
                                                updateFilter("stock", "all");
                                                setCurrentpage(1);
                                            }}
                                            className="form-radio text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span>همه</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* لیست محصولات */}
                    <div className="lg:w-3/4">

                        {/* نوار مرتب‌سازی و تعداد محصولات */}
                        <div className="bg-white rounded-2xl shadow-md border p-4 mb-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <span className="text-lg font-bold text-gray-700">
                                        نمایش <span className='text-emerald-600'>
                                            {Math.min(limitproduct, data?.length || 0)}
                                        </span> از <span className='text-emerald-600'>{data ? data.length : 0}</span> محصول
                                    </span>
                                    {countpagination > 1 && (
                                        <span className="text-sm text-gray-500 mr-4">
                                            (صفحه {currentpage} از {countpagination})
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-md font-semibold text-gray-600">مرتب‌سازی:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => updateSort(e.target.value)}
                                        className="border border-gray-300 p-2 rounded-xl bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                                    >
                                        <option value="">پیش‌فرض</option>
                                        <option value="price-asc">ارزان‌ترین (صعودی)</option>
                                        <option value="price-desc">گران‌ترین (نزولی)</option>
                                        <option value="rating-desc">محبوب‌ترین (امتیاز بالا)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-xl text-gray-600">در حال بارگذاری محصولات...</div>
                            </div>
                        ) : (
                            <>

                                {/* شبکه محصولات */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {currentProducts.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border border-gray-200 overflow-hidden"
                                        >
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full h-48 object-contain p-4 bg-gray-50 border-b border-gray-100"
                                            />
                                            <div className="p-6">
                                                <h3 className="font-extrabold text-xl text-gray-900 mb-2 truncate">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-emerald-600 font-medium mb-3">
                                                    {item.brand}
                                                </p>
                                                <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                                                    {item.description}
                                                </p>

                                                <div className="flex justify-between items-center mb-5 pt-3 border-t border-gray-100">
                                                    <span className="text-2xl font-black text-red-600">
                                                        ${item.price}
                                                    </span>
                                                    <div className="text-sm font-medium text-gray-600 flex flex-col items-end">
                                                        <span className='text-yellow-500'>
                                                            {`⭐ ${item.rating}`}
                                                        </span>
                                                        <span className={item.stock > 10 ? 'text-green-500' : 'text-orange-500'}>
                                                            {`📦 موجود: ${item.stock}`}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* دکمه افزودن به سبد خرید / تنظیمات تعداد */}
                                                {cart?.find((c) => c.id === item.id) ? (
                                                    <div className="flex justify-between items-center gap-4 bg-gray-100 p-2 rounded-full border border-gray-200">
                                                        <button
                                                            onClick={() => dispatch(decrement({ id: item.id }))}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 rounded-full transition duration-150 shadow-md"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="font-black text-xl text-gray-800">
                                                            {cart.find((c) => c.id === item.id)?.qty || 0}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                dispatch(
                                                                    increment({
                                                                        id: item.id,
                                                                        name: item.title,
                                                                        price: item.price,
                                                                        image: item.thumbnail,
                                                                    })
                                                                )
                                                            }
                                                            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full font-bold transition duration-150 shadow-md"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            dispatch(
                                                                increment({
                                                                    id: item.id,
                                                                    name: item.title,
                                                                    price: item.price,
                                                                    image: item.thumbnail,
                                                                })
                                                            )
                                                        }
                                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-bold transition duration-200 transform hover:scale-[1.01] shadow-lg shadow-blue-200/50"
                                                    >
                                                        🛒 افزودن به سبد خرید
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* پیام عدم وجود محصول */}
                                {data && data.length === 0 && (
                                    <div className="bg-white rounded-2xl shadow-lg p-16 text-center text-xl text-gray-500 border border-gray-200">
                                        😔 محصولی با این فیلترها یافت نشد. فیلترها را پاک کنید یا تغییر دهید.
                                    </div>
                                )}
                            </>
                        )}

                        {/* Pagination */}
                        {countpagination > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12 mb-8">


                                {/* دکمه قبلی */}
                                <button
                                    onClick={() => handlePageChange(currentpage - 1)}
                                    disabled={currentpage === 1}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                                >
                                    قبلی
                                </button>

                                {/* نمایش اولین صفحه اگر در محدوده نباشد */}
                                {currentpage > 3 && (
                                    <>
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition duration-150 font-bold"
                                        >
                                            1
                                        </button>
                                        {currentpage > 4 && (
                                            <span className="px-2 text-gray-500">...</span>
                                        )}
                                    </>
                                )}

                                {/* صفحات قبل از صفحه فعلی */}
                                {currentpage > 2 && (
                                    <button
                                        onClick={() => handlePageChange(currentpage - 2)}
                                        className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition duration-150 font-bold"
                                    >
                                        {currentpage - 2}
                                    </button>
                                )}
                                {currentpage > 1 && (
                                    <button
                                        onClick={() => handlePageChange(currentpage - 1)}
                                        className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition duration-150 font-bold"
                                    >
                                        {currentpage - 1}
                                    </button>
                                )}

                                {/* صفحه فعلی */}
                                <button
                                    className="w-10 h-10 rounded-lg bg-blue-600 text-white shadow-lg font-bold transition duration-150"
                                >
                                    {currentpage}
                                </button>

                                {/* صفحات بعد از صفحه فعلی */}
                                {currentpage < countpagination && (
                                    <button
                                        onClick={() => handlePageChange(currentpage + 1)}
                                        className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition duration-150 font-bold"
                                    >
                                        {currentpage + 1}
                                    </button>
                                )}
                                {currentpage < countpagination - 1 && (
                                    <button
                                        onClick={() => handlePageChange(currentpage + 2)}
                                        className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition duration-150 font-bold"
                                    >
                                        {currentpage + 2}
                                    </button>
                                )}

                                {/* نمایش آخرین صفحه اگر در محدوده نباشد */}
                                {currentpage < countpagination - 2 && (
                                    <>
                                        {currentpage < countpagination - 3 && (
                                            <span className="px-2 text-gray-500">...</span>
                                        )}
                                        <button
                                            onClick={() => handlePageChange(countpagination)}
                                            className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition duration-150 font-bold"
                                        >
                                            {countpagination}
                                        </button>
                                    </>
                                )}

                                {/* دکمه بعدی */}
                                <button
                                    onClick={() => handlePageChange(currentpage + 1)}
                                    disabled={currentpage === countpagination}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                                >
                                    بعدی
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
